import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import Router from './router';
import { IntlProvider } from 'react-intl';
import { messages } from './config/translations/messages';
import { DEFAULT_LOCALE } from './constants';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <IntlProvider locale={DEFAULT_LOCALE} messages={messages[DEFAULT_LOCALE]}>
                <Router/>
            </IntlProvider>
        </Provider>
    );
};

export default App;
