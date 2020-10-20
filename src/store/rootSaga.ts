import { all } from 'redux-saga/effects';
import {
    deleteContactSagaWatcher,
    fetchAllContactsSagaWatcher,
    fetchSingleContactSagaWatcher,
    saveContactSagaWatcher,
} from './contact/contact.saga';

function* rootSaga() {
    yield all([
        // Contact
        fetchAllContactsSagaWatcher(),
        fetchSingleContactSagaWatcher(),
        saveContactSagaWatcher(),
        deleteContactSagaWatcher(),
    ]);
}

export default rootSaga;