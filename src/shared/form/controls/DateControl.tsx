import React, { useEffect, useState } from 'react';
import { WithStyles } from '@material-ui/core';
import { FormField } from '../models/formField.model';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles';
import { DatePicker } from '@material-ui/pickers';
import { Moment } from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DATE_FORMAT } from '../../../constants';

interface IProps extends WithStyles<typeof styles> {
    field: FormField,
    onFormControlChange: (name: any, value: any, isValid: boolean) => void,
}

const DateControl: React.FC<IProps> = props => {
    const {
        classes,
        field: {
            errorMessage,
            initialValue,
            name,
            minDate,
            maxDate,
            onChange,
            label,
            required,
        },
        onFormControlChange,
    } = props;

    const [value, setValue] = useState<Moment | null>(null);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        processControl(initialValue);
        // eslint-disable-next-line
    }, []);

    const processControl = (newValue: MaterialUiPickersDate) => {
        const isValid = !required || !!newValue;
        const valueToSend = newValue?.format(DATE_FORMAT);

        setValue(newValue);
        setIsValid(isValid);

        onFormControlChange(name, valueToSend, isValid);
        onChange && onChange(valueToSend);
    };

    return (
        <DatePicker
            className={classes.fullWidth}
            error={!isValid || !!errorMessage}
            name={name}
            label={label}
            format={DATE_FORMAT}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            onChange={processControl}
            required={required}
            helperText={errorMessage}
        />
    );
};

export default withStyles(styles)(DateControl);
