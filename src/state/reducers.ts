import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history'
import clubs from './clubs/reducer'

export default (history: History) => combineReducers({
  router: connectRouter(history),
  clubs
})

