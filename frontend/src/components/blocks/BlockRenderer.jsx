import React from 'react';
import HeroBlock from './HeroBlock';
import StatsBlock from './StatsBlock';
import FeaturesBlock from './FeaturesBlock';
import ProcessStepsBlock from './ProcessStepsBlock';
import ValuesBlock from './ValuesBlock';
import TextContentBlock from './TextContentBlock';
import WhyChooseUsBlock from './WhyChooseUsBlock';
import FAQBlock from './FAQBlock';
import ContactInfoBlock from './ContactInfoBlock';

const BlockRenderer = ({ block, overrideContent }) => {
  if (!block || !block.blockId) return null;

  const blockData = block.blockId;
  const content = overrideContent || blockData.content;
  const settings = blockData.settings || {};

  const blockComponents = {
    hero: HeroBlock,
    stats: StatsBlock,
    features: FeaturesBlock,
    'process-steps': ProcessStepsBlock,
    values: ValuesBlock,
    'text-content': TextContentBlock,
    'why-choose-us': WhyChooseUsBlock,
    faq: FAQBlock,
    'contact-info': ContactInfoBlock,
  };

  const BlockComponent = blockComponents[blockData.blockType];

  if (!BlockComponent) {
    console.warn(`No component found for block type: ${blockData.blockType}`);
    return null;
  }

  return (
    <div
      className={settings.customCss || ''}
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        padding: settings.padding,
        margin: settings.margin,
      }}
    >
      <BlockComponent content={content} settings={settings} />
    </div>
  );
};

export default BlockRenderer;
