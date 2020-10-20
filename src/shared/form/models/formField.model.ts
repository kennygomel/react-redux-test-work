import { Moment } from 'moment';

export enum FormFieldType {
    TEXT = 'text',
    EMAIL = 'email',
    TEL = 'tel',
    DATE = 'date',
}

export interface FormField {
    label: JSX.Element | string;
    name: string;
    type: FormFieldType;
    errorMessage?: JSX.Element | string;
    onChange?: (value: any) => void;
    required?: boolean;
    fullWidth?: boolean;
    minDate?: Moment;
    maxDate?: Moment;
    initialValue?: any;
}