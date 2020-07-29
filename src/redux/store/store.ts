import { createStore} from '@reduxjs/toolkit'
import MyReducer from '../reducers/reducers'

const store = createStore(MyReducer)

export default store
export type StoreDispatch = typeof store.dispatch
