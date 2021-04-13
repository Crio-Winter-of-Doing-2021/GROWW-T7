import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productsReducer,productDetailsReducer} from './reducers/productReducers'
import {authReducer} from './reducers/userReducers'
import {faqsReducer} from './reducers/faqReducers'
const reducer = combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer,
    auth:authReducer,
    faqs:faqsReducer
})

let initialState = {}

const middleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;