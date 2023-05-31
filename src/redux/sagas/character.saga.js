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

function* addGame(action) {

    try{
        // Should create variable for action.payload
        const game = yield axios({
            method: 'POST',
            url: '/character',
            data: action.payload
        })

        console.log('POST for character adding game works yey', game.data);
        yield put({ type: 'FETCH_CHARACTERS' });
        
    } catch {

        console.log('POST Character Error', error)

    }

}


function* characterSaga() {

    yield takeLatest('FETCH_CHARACTERS', fetchCharacters);
    yield takeLatest('ADD_SAVE', addGame);

}

export default characterSaga;

