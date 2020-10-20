import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormFieldType } from '../../../shared/form/models/formField.model';
import moment from 'moment';
import { DATE_FORMAT } from '../../../constants';
import { ContactModel } from '../../../models/contact.model';

export const getFormFields = (contact: ContactModel | null) => ([
    {
        label: <FormattedMessage id="label.first_name"/>,
        type: FormFieldType.TEXT,
        initialValue: contact?.firstName || '',
        name: 'firstName',
        required: true,
    },
    {
        label: <FormattedMessage id="label.last_name"/>,
        type: FormFieldType.TEXT,
        initialValue: contact?.lastName || '',
        name: 'lastName',
        required: true,
    },
    {
        label: <FormattedMessage id="label.email"/>,
        type: FormFieldType.EMAIL,
        initialValue: contact?.email || '',
        name: 'email',
        required: true,
        fullWidth: true,
    },
    {
        label: <FormattedMessage id="label.phone"/>,
        type: FormFieldType.TEL,
        initialValue: contact?.phone || '',
        name: 'phone',
        required: true,
        fullWidth: true,
    },
    {
        label: <FormattedMessage id="label.dob"/>,
        type: FormFieldType.DATE,
        initialValue: contact?.dateOfBirth ? moment(contact.dateOfBirth, DATE_FORMAT) : moment(),
        name: 'dateOfBirth',
        fullWidth: true,
    },
]);