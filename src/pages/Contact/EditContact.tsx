import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../store/contact/contact.reducer';
import { singleContactSelector } from '../../store/contact/contact.selector';
import { FormattedMessage } from 'react-intl';
import BaseForm from '../../shared/form/BaseForm';
import styles from '../../styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { routes } from '../../router/routes';
import { useHistory } from 'react-router-dom';
import { getFormFields } from './formConfigs/editContact';


type IStateToProps = ReturnType<typeof mapStateToProps>;
type IDispatchToProps = typeof mapDispatchToProps;

interface IProps extends IDispatchToProps, IStateToProps, WithStyles<typeof styles> {
    contactId?: number,
}

const EditContactPage: React.FC<IProps> = props => {
    const { classes, clearSingleContact, contact, contactId, fetchSingleContact, saveContact } = props;

    const [isLoaded, setIsLoaded] = useState(true);
    const history = useHistory();

    const isNew = !contactId && !contact;
    const formIsLoaded = isLoaded && (!contactId || !!contact);

    useEffect(() => {
        if (!!contactId) {
            fetchSingleContact({
                id: contactId,
                callback: () => {
                    setIsLoaded(true);
                },
            });
        } else {
            setIsLoaded(true);
        }

        return function cleanup() {
            clearSingleContact();
        };
    }, [contactId, fetchSingleContact, clearSingleContact]);


    const getFormOptions = () => ({
        fields: getFormFields(contact),
        isValidOnLoad: !!contactId,
        onCancel: () => {
            history.push(routes.contacts.to);
        },
        onSubmit: (changes: any) => {
            saveContact({
                ...(!!contactId && { id: contactId }),
                ...(!!contact && contact),
                ...changes,
                callback: () => {
                    history.push(routes.contacts.to);
                },
            });
        },
        cancelLabel: <FormattedMessage id="general.cancel"/>,
        submitLabel: <FormattedMessage id="general.save"/>,
    });

    return (
        <>
            {!formIsLoaded && (
                <h1 className={classes.textCenter}>Loading...</h1>
            )}
            {formIsLoaded && (!contactId || !!contact) && (
                <>
                    <h1 className={classes.headline}>
                        <FormattedMessage id={isNew ? 'contact.new' : 'contact.edit'}/>
                    </h1>
                    <BaseForm options={getFormOptions()}/>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state: any) => ({
    contact: singleContactSelector(state),
});

const mapDispatchToProps = {
    saveContact: actions.saveContact,
    fetchSingleContact: actions.fetchSingleContact,
    clearSingleContact: actions.clearSingleContact,
};

export default withStyles(styles)(connect<IStateToProps, IDispatchToProps>(
    mapStateToProps,
    mapDispatchToProps,
)(EditContactPage));
