import React, { ChangeEvent, useState } from 'react';
import { TextField, WithStyles } from '@material-ui/core';
import { FormField } from '../models/formField.model';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles';

interface IProps extends WithStyles<typeof styles> {
    field: FormField,
    onFormControlChange: (name: any, value: any, isValid: boolean) => void,
}

const TelControl: React.FC<IProps> = props => {
    const {
        classes,
        field: {
            errorMessage,
            initialValue,
            name,
            label,
            onChange,
            required,
            type,
        },
        onFormControlChange,
    } = props;

    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(true);

    // eslint-disable-next-line
    const validationRegExp = /^\d{7,}$/;

    const onControlChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value: newValue } } = event;

        processControl(newValue);
    };

    const processControl = (newValue: string) => {
        const isValid = (
            !required
            && !newValue
        ) || (
            !!newValue
            // eslint-disable-next-line
            && validationRegExp.test(newValue.replace(/[\s()+\-\.]|ext/gi, ''))
        );

        setValue(newValue);
        setIsValid(isValid);

        onFormControlChange(name, newValue, isValid);
        onChange && onChange(newValue);
    };

    return (
        <TextField
            className={classes.fullWidth}
            error={!!errorMessage || !isValid}
            type={type}
            name={name}
            value={value}
            onChange={onControlChange}
            label={label}
            required={!!required}
            helperText={errorMessage}
        />
    );
};

export default withStyles(styles)(TelControl);
