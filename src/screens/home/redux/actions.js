import axios from 'axios';
import types from './types';
import configMarvelApi from '../../../utils/configMarvelApi';

export const getCharactersAction = (offset, nameStartsWith) => (dispatch) => {
    dispatch({type:types.GET_CHARACTERS});

    var params = {
        ...configMarvelApi.getParamRequest(),
        offset:offset,
        nameStartsWith:nameStartsWith
    }
    return axios.get(`${configMarvelApi.MARVEL_BASE_URL}/characters`, {params:params}).then(
        (response) => {
            dispatch({ type: types.GET_CHARACTERS_SUCESS, payload:response.data});},

        (error) => {
            dispatch({ type: types.GET_CHARACTERS_ERROR });}
        );
    }