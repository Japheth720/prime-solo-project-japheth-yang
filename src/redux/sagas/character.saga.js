import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";


function* fetchCharacters() {

    try{

        const character = yield axios.get('/api/character');
        console.log('GET fetchCharacters Sagas', character.data);
        // yield put({ type: 'SET_CHARACTERS', payload: character.data });

    } catch {

        console.log('fetchCharacters GET Sagas ERROR', error);

    }
}


// function* characterSaga() {

//     yield takeLatest('CHARACTER')
// }

