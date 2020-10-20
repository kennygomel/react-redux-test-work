import { WithCallback } from '../shared/withCallback';

export interface ContactModel {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
}

export interface FetchContactsProps extends WithCallback {
}

export interface FetchContactProps extends WithCallback {
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