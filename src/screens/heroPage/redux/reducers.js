import GET_CHARACTER_STATE from './types';

const INITIAL_STATE = {
    listSeries: [],
    isLoading: false,
    error: false,
    total:0,
    infoCharacter:null
    };

const characterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CHARACTER_STATE.GET_CHARACTER:
            return {...state,
                isLoading:true,
                error:false
            };
        
        case GET_CHARACTER_STATE.GET_CHARACTER_SUCESS:
            return {...state,
                listSeries:action.payload.data.results,
                isLoading:false,
                error:false
            };

        case GET_CHARACTER_STATE.GET_CHARACTER_ERROR:
            return {...state,
                isLoading:false,
                error:true
            };
        
        default:
            return state;
    }
}; 

export default {characterReducer};