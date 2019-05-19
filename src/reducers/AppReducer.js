import { combineReducers } from 'redux';
import charactersReducer from '../screens/home/redux/reducers';
import characterReducer from '../screens/heroPage/redux/reducers';


export default combineReducers({
    characters:charactersReducer.charactersReducer,
    character:characterReducer.characterReducer
});
