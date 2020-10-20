import React, { ChangeEvent, useState } from 'react';
import { TextField, WithStyles } from '@material-ui/core';
import { FormField } from '../models/formField.model';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles';

interface IProps extends WithStyles<typeof styles> {
    field: FormField,
    onFormControlChange: (name: any, value: any, isValid: boolean) => void,
}

const TextControl: React.FC<IProps> = props => {
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

    const onControlChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value: newValue } } = event;

        processControl(newValue);
    };

    const processControl = (newValue: string) => {
        const isValid = !required || !!newValue;

        setValue(newValue);
        setIsValid(isValid);

        onFormControlChange(name, newValue, isValid);
        onChange && onChange(newValue);
    };

    return (
        <TextField
            className={classes.fullWidth}
            error={!isValid || !!errorMessage}
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

export default withStyles(styles)(TextControl);
