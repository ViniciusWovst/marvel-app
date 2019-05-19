import GET_CHARACTERS_STATE from './types';

const INITIAL_STATE = {
    listCharacters: [],
    isLoading: false,
    error: false,
    total:0
    };

const charactersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CHARACTERS_STATE.GET_CHARACTERS:
            return {...state,
                isLoading:true,
                error:false
            };
        
        case GET_CHARACTERS_STATE.GET_CHARACTERS_SUCESS:
            return {...state,
                listCharacters:action.payload.data.results,
                total:action.payload.data.total,
                isLoading:false,
                error:false
            };

        case GET_CHARACTERS_STATE.GET_CHARACTERS_ERROR:
            return {...state,
                isLoading:false,
                error:true
            };
        
        default:
            return state;
    }
}; 

export default {charactersReducer};