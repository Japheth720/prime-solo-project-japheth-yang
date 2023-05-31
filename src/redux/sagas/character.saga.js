import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";


function* fetchCharacters() {

    try{

        const character = yield axios.get('/character');
        console.log('GET fetchCharacters Sagas', character.data);

        const theCharacters = character.data;
        yield put({ type: 'SET_CHARACTERS', payload: theCharacters });

    } catch {

        console.log('fetchCharacters GET Sagas ERROR', error);

    }
}


function* characterSaga() {

    yield takeLatest('FETCH_CHARACTERS', fetchCharacters);

}

export default characterSaga;

