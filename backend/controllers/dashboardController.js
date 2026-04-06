const BlogPost = require('../models/BlogPost');
const TeamMember = require('../models/TeamMember');
const ContactInquiry = require('../models/ContactInquiry');
const Service = require('../models/Service');

/** @param {Date} a @param {Date} b */
const msBetween = (a, b) => Math.abs(new Date(a).getTime() - new Date(b).getTime());

/**
 * Merged, deduplicated recent events for the admin dashboard (by entity + type).
 */
const getDashboardFeed = async (req, res) => {
  try {
    const [blogs, team, contacts, services] = await Promise.all([
      BlogPost.find()
        .select('title isPublished publishedAt updatedAt createdAt')
        .sort({ updatedAt: -1 })
        .limit(20)
        .lean(),
      TeamMember.find()
        .select('name updatedAt createdAt')
        .sort({ updatedAt: -1 })
        .limit(20)
        .lean(),
      ContactInquiry.find()
        .select('name email serviceOfInterest createdAt')
        .sort({ createdAt: -1 })
        .limit(20)
        .lean(),
      Service.find()
        .select('name title updatedAt createdAt')
        .sort({ updatedAt: -1 })
        .limit(15)
        .lean(),
    ]);

    const raw = [];

    blogs.forEach((b) => {
      const at = b.updatedAt || b.publishedAt || b.createdAt;
      let action = 'Blog post updated';
      if (!b.isPublished) {
        action = 'Blog draft saved';
      } else if (b.publishedAt) {
        const pub = new Date(b.publishedAt).getTime();
        const upd = new Date(b.updatedAt || b.publishedAt).getTime();
        if (upd - pub <= 120000) action = 'Blog post published';
        else action = 'Blog post updated';
      } else {
        action = 'Blog post updated';
      }
      raw.push({
        id: String(b._id),
        type: 'blog',
        action,
        item: b.title || 'Untitled post',
        at,
        link: '/admin/blog',
      });
    });

    team.forEach((m) => {
      const at = m.updatedAt || m.createdAt;
      const isNew = msBetween(m.createdAt, m.updatedAt) < 4000;
      raw.push({
        id: String(m._id),
        type: 'team',
        action: isNew ? 'Team member added' : 'Team profile updated',
        item: m.name,
        at,
        link: '/admin/team',
      });
    });

    contacts.forEach((c) => {
      raw.push({
        id: String(c._id),
        type: 'contact',
        action: 'New contact inquiry',
        item: `${c.name} — ${c.serviceOfInterest || 'General'}`,
        at: c.createdAt,
        link: '/admin/contacts',
      });
    });

    services.forEach((s) => {
      const at = s.updatedAt || s.createdAt;
      const isNew = msBetween(s.createdAt, s.updatedAt) < 4000;
      raw.push({
        id: String(s._id),
        type: 'service',
        action: isNew ? 'Service added' : 'Service updated',
        item: s.name || s.title || 'Service',
        at,
        link: '/admin/services',
      });
    });

    const bestByKey = new Map();
    for (const item of raw) {
      const key = `${item.type}:${item.id}`;
      const prev = bestByKey.get(key);
      if (!prev || new Date(item.at) > new Date(prev.at)) {
        bestByKey.set(key, item);
      }
    }

    const merged = [...bestByKey.values()].sort(
      (a, b) => new Date(b.at) - new Date(a.at)
    );

    res.status(200).json({
      success: true,
      data: merged.slice(0, 12),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not load dashboard feed',
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardFeed,
};
