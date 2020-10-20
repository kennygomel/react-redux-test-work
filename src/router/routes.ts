import PeopleIcon from '@material-ui/icons/People';

export const routes = {
    contacts: {
        to: '/contacts',
        icon: PeopleIcon,
    },
    editContact: {
        to: '/contacts/:contactId',
    },
    newContact: {
        to: '/contacts/new',
    },
};
