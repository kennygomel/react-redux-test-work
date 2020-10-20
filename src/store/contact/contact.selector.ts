import { RootState } from '../rootReducer';

export const contactsSelector = (state: RootState) => state.contact.data;
export const contactsStatusSelector = (state: RootState) => state.contact.status;
export const singleContactSelector = (state: RootState) => state.contact.singleContact;
export const singleContactStatusSelector = (state: RootState) => state.contact.singleContactStatus;
export const saveContactStatusSelector = (state: RootState) => state.contact.saveContactStatus;
export const deleteContactStatusSelector = (state: RootState) => state.contact.deleteContactStatus;
