import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { routes } from './routes';
import ContactListPage from '../pages/Contact/ContactList';
import EditContactPage from '../pages/Contact/EditContact';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Container fixed>
                <Switch>
                    <Route exact path="/">
                        <Redirect to={routes.contacts.to}/>
                    </Route>
                    <Route exact path={routes.contacts.to}>
                        <ContactListPage/>
                    </Route>
                    <Route exact path={routes.newContact.to}>
                        <EditContactPage/>
                    </Route>
                    <Route
                        path={routes.editContact.to}
                        children={({ match }) => (
                            <EditContactPage contactId={match?.params.contactId}/>
                        )}
                    />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default Router;
