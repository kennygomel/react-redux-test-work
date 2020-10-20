import React, { useEffect, useState } from 'react';
import { FormOptions } from './models/formOptions.model';
import { FormField, FormFieldType } from './models/formField.model';
import TextControl from './controls/TextControl';
import EmailControl from './controls/EmailControl';
import TelControl from './controls/TelControl';
import { Button, Grid, WithStyles } from '@material-ui/core/';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import DateControl from './controls/DateControl';

interface IProps extends WithStyles<typeof styles> {
    options: FormOptions;
}

export type FormData = {[k: string]: {isValid: boolean, value: any}};

const BaseForm: React.FC<IProps> = props => {
    const {
        classes,
        options: {
            fields,
            onSubmit,
            onCancel = () => {},
            isValidOnLoad = false,
            cancelLabel = 'Cancel',
            submitLabel = 'Ok'
        }
    } = props;
    const reduceFormFieldsToFormData = (acc: FormData, field: FormField) => {
        acc[field.name] = {
            value: field.initialValue,
            isValid: isValidOnLoad,
        };

        return acc;
    };
    const [formData, setFormData] = useState(fields.reduce(reduceFormFieldsToFormData, {}) as FormData);
    const [isLoading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const invalidFields = Object.keys(formData).reduce((acc: string[], fieldName: string) => {
            if (!formData[fieldName].isValid) acc.push(fieldName);
            return acc;
        }, []);

        setIsValid(!invalidFields.length);
    }, [formData]);

    const onFormControlChange = (name: any, value: any, isValid: boolean) => {
        setFormData({ ...formData, [name]: { isValid, value } });
    };

    const renderInput = (field: FormField) => {
        switch (field.type) {
            case FormFieldType.EMAIL:
                return <EmailControl
                    key={field.name}
                    field={field}
                    onFormControlChange={onFormControlChange}
                />;
            case FormFieldType.TEL:
                return <TelControl
                    key={field.name}
                    field={field}
                    onFormControlChange={onFormControlChange}
                />;
            case FormFieldType.DATE:
                return <DateControl
                    key={field.name}
                    field={field}
                    onFormControlChange={onFormControlChange}
                />;
            default:
                return <TextControl
                    key={field.name}
                    field={field}
                    onFormControlChange={onFormControlChange}
                />;
        }
    };

    const submitForm = () => {
        if (!isValid) return;

        setLoading(true);

        const formDataToSubmit = Object.keys(formData).reduce((acc: {[k: string]: any}, fieldName: string) => {
            acc[fieldName] = formData[fieldName].value;
            return acc;
        }, {});

        onSubmit(formDataToSubmit);

        setLoading(false);
    };

    return (
        <form className={classes.form} onSubmit={() => submitForm()}>
            <Grid container justify="center" spacing={2}>
                {fields.map((field: FormField) => (
                    <Grid key={field.name} sm={12} md={field.fullWidth ? 12 : 6} item>
                        {renderInput(field)}
                    </Grid>
                ))}
                <Grid key="cancel" xs={12} md={6} item>
                    <Button
                        className={classes.fullWidth}
                        variant="contained"
                        color="secondary"
                        onClick={() => onCancel()}
                    >
                        {cancelLabel}
                    </Button>
                </Grid>
                <Grid key="submit" xs={12} md={6} item>
                    <Button
                        disabled={!isValid || isLoading}
                        className={classes.fullWidth}
                        variant="contained"
                        color="primary"
                        onClick={() => submitForm()}
                    >
                        {submitLabel}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default withStyles(styles)(BaseForm);
