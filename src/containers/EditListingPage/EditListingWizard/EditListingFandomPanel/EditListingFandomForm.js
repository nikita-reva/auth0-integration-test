import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';

// Import configs and util modules
import config from '../../../../config';
import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
import { propTypes } from '../../../../util/types';
import { maxLength, required, composeValidators } from '../../../../util/validators';
import { findConfigForSelectFilter } from '../../../../util/search';

// Import shared components
import { Form, Button } from '../../../../components';
// Import modules from this directory
import CustomFieldEnum from '../CustomFieldEnum';
import css from './EditListingFandomForm.module.css';

const EditListingFandomFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        autoFocus,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
      } = formRenderProps;

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};

      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFandomForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFandomForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFandomForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const fandomConfig = findConfigForSelectFilter('fandom', filterConfig);
      const fandomSchemaType = fandomConfig.schemaType;
      const fandoms = fandomConfig.options ? fandomConfig.options : [];

      const fandomLabel = intl.formatMessage({
        id: 'EditListingFandomForm.fandomLabel',
      });

      const fandomPlaceholder = intl.formatMessage({
        id: 'EditListingFandomForm.fandomPlaceholder',
      });

      const fandomRequired = required(
        intl.formatMessage({
          id: 'EditListingFandomForm.fandomRequired',
        })
      );

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <CustomFieldEnum
            id="fandom"
            name="fandom"
            options={fandoms}
            label={fandomLabel}
            placeholder={fandomPlaceholder}
            validate={fandomRequired}
            schemaType={fandomSchemaType}
          />
          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingFandomFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingFandomFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

export default compose(injectIntl)(EditListingFandomFormComponent);
