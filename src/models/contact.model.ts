import { WithCallback } from '../shared/withCallback';

export interface ContactModel {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
}

export interface FetchAllContactsProps extends WithCallback {
}

export interface FetchSingleContactProps extends WithCallback {
    id: number;
}

export interface SaveContactProps extends WithCallback {
    id?: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
}

export interface DeleteContactProps extends WithCallback {
    id: number;
}