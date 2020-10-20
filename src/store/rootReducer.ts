import { combineReducers } from '@reduxjs/toolkit';
import contactReducer from './contact/contact.reducer';

const rootReducer = combineReducers({
    contact: contactReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;