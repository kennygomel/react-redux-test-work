import { FormField } from './formField.model';

export interface FormOptions {
    fields: FormField[];
    onSubmit: (changes: {[k: string]: any}) => void;
    isValidOnLoad?: boolean;
    onCancel?: () => void;
    cancelLabel?: JSX.Element | string;
    submitLabel?: JSX.Element | string;
}