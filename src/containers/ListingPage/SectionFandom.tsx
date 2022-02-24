import React from 'react';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.module.css';

const SectionFandom = props => {
  const { publicData, options } = props;

  if (!publicData) {
    return null;
  }

  const fandom = publicData.fandom;
  const fandomOption = options.find(option => option.key === fandom);

  return fandom && fandomOption ? (
    <div className={css.sectionFandom}>
      <h2 className={css.fandomTitle}>
        <FormattedMessage id="ListingPage.fandomTitle" />
      </h2>
      <p className={css.fandom}>{fandomOption.label}</p>
    </div>
  ) : null;
};

export default SectionFandom;
