import axios from 'axios';
import types from './types';
import configMarvelApi from '../../../utils/configMarvelApi';

export const getCharacterAction = (id) => (dispatch) => {
    dispatch({type:types.GET_CHARACTER});

    return axios.get(`${configMarvelApi.MARVEL_BASE_URL}/characters/${id}/series`, {params:configMarvelApi.getParamRequest()}).then(
        (response) => {
            dispatch({ type: types.GET_CHARACTER_SUCESS, payload:response.data});},

        (error) => {
            dispatch({ type: types.GET_CHARACTER_ERROR })}
        );
    }