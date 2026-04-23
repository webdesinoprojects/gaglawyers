require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const HEADING_STANDARD = 'Standard Agreement Format';
const HEADING_CLAUSES = 'Key Clauses to Include';
const HEADING_LEGAL = 'Legal Considerations';

const TOPIC_MATCHER =
  /(Agreement Formats and Considerations|Standard Agreement Format|Key Clauses to Include|Legal Considerations)/i;

const normalizeItems = (items) =>
  items.map((item) => ({
    title: item.title,
    description: item.description,
  }));

const standardContent = {
  items: normalizeItems([
    {
      title: 'Parties',
      description:
        'Clearly identify seller and purchaser with complete legal details.',
    },
    {
      title: 'Property Description',
      description:
        'Accurate description including location, area, and title particulars.',
    },
    {
      title: 'Consideration Amount',
      description:
        'Total sale consideration and payment-linked obligations.',
    },
    {
      title: 'Payment Schedule',
      description:
        'Time-bound schedule for token, interim, and final payments.',
    },
  ]),
};

const clausesContent = {
  items: normalizeItems([
    {
      title: 'Possession Date',
      description:
        'Specific delivery timeline for vacant and lawful possession.',
    },
    {
      title: 'Title Warranty',
      description:
        'Seller declaration on marketable title and legal ownership.',
    },
    {
      title: 'Encumbrance Certificate',
      description:
        'Disclosure and verification of liabilities/charges on property.',
    },
    {
      title: 'Penalty for Default',
      description:
        'Consequences and compensation mechanism for breach by either party.',
    },
    {
      title: 'Registration Timeline',
      description:
        'Defined deadline for execution and registration formalities.',
    },
  ]),
};

const legalContent = {
  items: normalizeItems([
    {
      title: 'Stamp Duty Implications',
      description:
        'Applicable stamp obligations vary by transaction type and state law.',
    },
    {
      title: 'Section 54, Transfer of Property Act',
      description:
        'Agreement to sell does not itself transfer ownership without valid conveyance.',
    },
    {
      title: 'Enforceability',
      description:
        'Draft quality and evidence trail determine enforceability in specific performance disputes.',
    },
    {
      title: 'Suraj Lamp & Industries Position',
      description:
        'Supreme Court clarified limits of GPA/SA/WILL transactions as title transfer instruments.',
    },
  ]),
};

async function upsertSectionByHeading({
  serviceId,
  sections,
  heading,
  content,
  preferredOrder,
}) {
  const matches = sections
    .filter((row) => new RegExp(`^${heading}$`, 'i').test(row.heading || ''))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (matches.length > 0) {
    const keep = matches[0];
    await ServiceSection.updateOne(
      { _id: keep._id },
      {
        $set: {
          heading,
          type: 'benefits',
          background: keep.background || 'light',
          content,
          visible: true,
          order: preferredOrder,
        },
      }
    );

    if (matches.length > 1) {
      const duplicateIds = matches.slice(1).map((row) => row._id);
      await ServiceSection.deleteMany({ _id: { $in: duplicateIds } });
    }
    return;
  }

  await ServiceSection.create({
    serviceId,
    heading,
    type: 'benefits',
    background: 'light',
    content,
    order: preferredOrder,
    visible: true,
  });
}

async function main() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Missing MONGO_URI in environment');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const service = await Service.findOne({ slug: 'agreement-to-sell' })
      .select('_id slug name')
      .lean();
    if (!service) {
      throw new Error('Service not found: agreement-to-sell');
    }

    const sections = await ServiceSection.find({ serviceId: service._id })
      .sort({ order: 1 })
      .lean();

    const legacy = sections.find((row) =>
      /Agreement Formats and Considerations/i.test(row.heading || '')
    );

    const insertionBase =
      typeof legacy?.order === 'number'
        ? legacy.order
        : sections.length > 0
          ? Math.max(...sections.map((row) => Number(row.order) || 0)) + 1
          : 0;

    if (legacy) {
      await ServiceSection.updateOne(
        { _id: legacy._id },
        {
          $set: {
            heading: HEADING_STANDARD,
            type: 'benefits',
            content: standardContent,
            visible: true,
            order: insertionBase,
          },
        }
      );
    }

    const refreshed = await ServiceSection.find({ serviceId: service._id })
      .sort({ order: 1 })
      .lean();

    await upsertSectionByHeading({
      serviceId: service._id,
      sections: refreshed,
      heading: HEADING_STANDARD,
      content: standardContent,
      preferredOrder: insertionBase,
    });
    await upsertSectionByHeading({
      serviceId: service._id,
      sections: refreshed,
      heading: HEADING_CLAUSES,
      content: clausesContent,
      preferredOrder: insertionBase + 1,
    });
    await upsertSectionByHeading({
      serviceId: service._id,
      sections: refreshed,
      heading: HEADING_LEGAL,
      content: legalContent,
      preferredOrder: insertionBase + 2,
    });

    const finalSections = await ServiceSection.find({
      serviceId: service._id,
      heading: { $regex: TOPIC_MATCHER },
    })
      .sort({ order: 1 })
      .lean();

    const keepSet = new Set([
      HEADING_STANDARD.toLowerCase(),
      HEADING_CLAUSES.toLowerCase(),
      HEADING_LEGAL.toLowerCase(),
    ]);

    const extraIds = finalSections
      .filter((row) => !keepSet.has(String(row.heading || '').toLowerCase()))
      .map((row) => row._id);
    if (extraIds.length > 0) {
      await ServiceSection.deleteMany({ _id: { $in: extraIds } });
    }

    const verify = await ServiceSection.find({
      serviceId: service._id,
      heading: { $in: [HEADING_STANDARD, HEADING_CLAUSES, HEADING_LEGAL] },
    })
      .sort({ order: 1 })
      .lean();

    console.log(
      `Updated agreement-to-sell split sections (${verify.length}/3): ${verify
        .map((row) => row.heading)
        .join(' | ')}`
    );
  } catch (error) {
    console.error(`Fix failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

main();
