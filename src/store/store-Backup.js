import { applyMiddleware, combineReducers, compose, createStore, } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers/rootReducers';
//import { reducer as reduxFormReducer } from 'redux-form';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(rootReducers);

export const store = createStore(rootReducers, composeEnhancers(middleware));
