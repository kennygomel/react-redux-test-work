import { put, takeEvery } from 'redux-saga/effects';
import { actions } from './contact.reducer';
import { contactService } from '../../services/contact.service';

export function* fetchAllContactsSagaWatcher() {
    yield takeEvery(actions.fetchAllContacts.type, fetchAllContactsSaga);
}

function* fetchAllContactsSaga(action: ReturnType<typeof actions.fetchAllContacts>) {
    const { payload } = action;
    try {
        const data = { ...payload };
        delete data.callback;
        yield put(actions.start());
        const contacts = contactService.getContacts(data);
        yield put(actions.success(contacts));

        if (payload.callback) {
            payload.callback();
        }
    } catch (err) {
        yield put(actions.error());
    }
}

export function* fetchSingleContactSagaWatcher() {
    yield takeEvery(actions.fetchSingleContact.type, fetchSingleContactSaga);
}

function* fetchSingleContactSaga(action: ReturnType<typeof actions.fetchSingleContact>) {
    const { payload } = action;
    try {
        const data = { ...payload };
        delete data.callback;
        yield put(actions.startFetchSingleContact());
        const contact = contactService.getContact(data);
        yield put(actions.successFetchSingleContact(contact));

        if (payload.callback) {
            payload.callback();
        }
    } catch (err) {
        yield put(actions.error());
    }
}

export function* saveContactSagaWatcher() {
    yield takeEvery(actions.saveContact.type, saveContactSaga);
}

function* saveContactSaga(action: ReturnType<typeof actions.saveContact>) {
    const { payload } = action;
    try {
        const data = { ...payload };
        delete data.callback;
        yield put(actions.startSaveContact());
        contactService.saveContact(data);
        yield put(actions.successSaveContact());

        if (payload.callback) {
            payload.callback();
        }
    } catch (err) {
        yield put(actions.error());
    }
}

export function* deleteContactSagaWatcher() {
    yield takeEvery(actions.deleteContact.type, deleteContactSaga);
}

function* deleteContactSaga(action: ReturnType<typeof actions.deleteContact>) {
    const { payload } = action;
    try {
        const data = { ...payload };
        delete data.callback;
        yield put(actions.start());
        contactService.deleteContact(data);
        yield put(actions.successDeleteContact());

        if (payload.callback) {
            payload.callback();
        }
    } catch (err) {
        yield put(actions.error());
    }
}
