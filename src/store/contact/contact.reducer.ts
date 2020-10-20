import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStatus } from '../../models/fetchStatus.model';
import {
    ContactModel,
    DeleteContactProps,
    FetchContactProps,
    FetchContactsProps,
    SaveContactProps,
} from '../../models/contact.model';
import { withStatusReducers } from '../withStatusReducers';

interface ContactSliceState {
    data: ContactModel[];
    status: FetchStatus;
    singleContact: ContactModel | null;
    singleContactStatus: FetchStatus;
    saveContactStatus: FetchStatus;
    deleteContactStatus: FetchStatus;
}

const orderSlice = createSlice({
    name: 'contact',
    initialState: {
        status: FetchStatus.Finished,
        data: [],
        singleContact: null,
        singleContactStatus: FetchStatus.Finished,
        saveContactStatus: FetchStatus.Finished,
        deleteContactStatus: FetchStatus.Finished,
    } as ContactSliceState,
    reducers: {
        ...withStatusReducers<ContactModel[], ContactSliceState>(),
        startFetchSingleContact: (state: any) => {
            state.singleContactStatus = FetchStatus.Loading;
            return state;
        },
        successFetchSingleContact: (state: any, action: PayloadAction<any>) => {
            state.singleContact = action.payload as ContactModel;
            state.singleContactStatus = FetchStatus.Finished;
            return state;
        },
        clearSingleContact: (state: any) => {
            state.singleContact = null;
            state.singleContactStatus = FetchStatus.Finished;
            return state;
        },
        startSaveContact: (state: any) => {
            state.saveContactStatus = FetchStatus.Loading;
            return state;
        },
        successSaveContact: (state: any) => {
            state.saveContactStatus = FetchStatus.Finished;
            return state;
        },
        startDeleteContact: (state: any) => {
            state.deleteContactStatus = FetchStatus.Loading;
            return state;
        },
        successDeleteContact: (state: any) => {
            state.deleteContactStatus = FetchStatus.Finished;
            return state;
        },
    },
});

const fetchAllContacts = createAction<FetchContactsProps>('contact/fetchAllContacts');
const fetchSingleContact = createAction<FetchContactProps>('contact/fetchSingleContact');
const saveContact = createAction<SaveContactProps>('contact/saveContact');
const deleteContact = createAction<DeleteContactProps>('contact/deleteContact');

const { actions: sliceActions, reducer } = orderSlice;

export const actions = {
    ...sliceActions,
    fetchAllContacts,
    fetchSingleContact,
    saveContact,
    deleteContact,
};

export default reducer;
