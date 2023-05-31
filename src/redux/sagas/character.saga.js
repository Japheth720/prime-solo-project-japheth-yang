import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* fetchCharacters() {

    try{

        const character = yield axios.get('/api/user');
        console.log('GET fetchCharacters Sagas', character.data);
        yield put({ type: 'GET_CHARACTERS', payload: character.data });

    } catch {

        console.log('fetchCharacters GET Sagas ERROR', error);
        
    }
}

