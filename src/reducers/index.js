import { combineReducers } from 'redux';
import figmaReducer from './figmaReducer';


export default combineReducers({
  figmaNodes: figmaReducer,
});
