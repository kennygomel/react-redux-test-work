import React, { useEffect, useState } from 'react';
import { Button, IconButton, WithStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { connect } from 'react-redux';
import { actions } from '../../store/contact/contact.reducer';
import { contactsSelector } from '../../store/contact/contact.selector';
import { ContactModel } from '../../models/contact.model';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styles from '../../styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { routes } from '../../router/routes';

type IStateToProps = ReturnType<typeof mapStateToProps>;
type IDispatchToProps = typeof mapDispatchToProps;

interface IProps extends IDispatchToProps, IStateToProps, WithStyles<typeof styles> {
}

const ContactListPage: React.FC<IProps> = props => {
    const { classes, contacts, deleteContact, fetchAllContacts } = props;

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            fetchAllContacts({
                callback: () => {
                    setIsLoaded(true);
                },
            });
        }
    }, [isLoaded, fetchAllContacts]);

    const onContactDeleteClick = (id: number) => {
        deleteContact({
            id,
            callback: () => refreshContacts(),
        });
    };

    const refreshContacts = () => {
        setIsLoaded(false);
    };

    const renderTable = () => (
        <TableContainer className={classes.table} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            <FormattedMessage id="label.id"/>
                        </TableCell>
                        <TableCell>
                            <FormattedMessage id="label.first_name"/>
                        </TableCell>
                        <TableCell>
                            <FormattedMessage id="label.last_name"/>
                        </TableCell>
                        <TableCell>
                            <FormattedMessage id="label.phone"/>
                        </TableCell>
                        <TableCell>
                            <FormattedMessage id="label.email"/>
                        </TableCell>
                        <TableCell>
                            <FormattedMessage id="label.dob"/>
                        </TableCell>
                        <TableCell align="center" width="150">
                            <FormattedMessage id="label.actions"/>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!!contacts.length && contacts.map((contact: ContactModel) => (
                        <TableRow key={contact.id}>
                            <TableCell align="center" component="th" scope="row">
                                {contact.id}
                            </TableCell>
                            <TableCell>{contact.firstName}</TableCell>
                            <TableCell>{contact.lastName}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.dateOfBirth || '-'}</TableCell>
                            <TableCell align="center">
                                <Link
                                    className={classes.buttonLink}
                                    to={routes.editContact.to.replace(':contactId', contact.id.toString())}
                                >
                                    <IconButton key="edit">
                                        <EditIcon/>
                                    </IconButton>
                                </Link>
                                <IconButton key="delete" onClick={() => {
                                    onContactDeleteClick(contact.id);
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {!contacts.length && (
                        <TableRow key="noContacts">
                            <TableCell colSpan={7} className={classes.textCenter}>
                                <FormattedMessage id="contact.not_found"/>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <>
            {!isLoaded && (
                <h1 className={classes.textCenter}>Loading...</h1>
            )}
            {isLoaded && (
                <>
                    <h1>
                        <FormattedMessage id="contact.list"/>
                    </h1>
                    {renderTable()}
                    <Link
                        className={classes.buttonLink}
                        to={routes.newContact.to}
                    >
                        <Button
                            key="addContact"
                            variant="contained"
                            color="primary"
                            startIcon={<PersonAddIcon/>}
                        >
                            <FormattedMessage id="contact.add"/>
                        </Button>
                    </Link>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state: any) => ({
    contacts: contactsSelector(state),
});

const mapDispatchToProps = {
    deleteContact: actions.deleteContact,
    fetchAllContacts: actions.fetchAllContacts,
    // saveContact: actions.saveContact,
};

export default withStyles(styles)(connect<IStateToProps, IDispatchToProps>(
    mapStateToProps,
    mapDispatchToProps,
)(ContactListPage));
