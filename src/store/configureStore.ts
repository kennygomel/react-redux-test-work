import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureAppStore(preloadedState: any) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [
            sagaMiddleware,
            ...getDefaultMiddleware({
                thunk: false,
                serializableCheck: false,
            }),
        ],
        preloadedState,
    });

    sagaMiddleware.run(rootSaga);

    // @ts-ignore
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // @ts-ignore
        module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
    }

    return store;
}

export const store = configureAppStore({});
