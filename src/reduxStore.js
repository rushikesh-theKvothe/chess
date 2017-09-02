import { createStore } from 'redux'
import gameReducer from './reducers'

let store = createStore(gameReducer)

export default store