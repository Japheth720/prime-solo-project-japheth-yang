import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//GET Sagas
function* fetchCharacters() {

    try {

        const character = yield axios.get('/character');
        console.log('GET fetchCharacters Sagas', character.data);

        const theCharacters = character.data;
        yield put({ type: 'SET_CHARACTERS', payload: theCharacters });

    } catch {

        console.log('fetchCharacters GET Sagas ERROR', error);

    }
}

//POST Sagas
function* addGame(action) {

    try {
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

// DELETE Sagas
function* deleteCharacter(action) {
    try {

        const item = yield axios({

            method: 'DELETE',
            url: `/character/${action.payload}`

        })

        console.log('Delete Character Sagas', item.data);
        yield put({ type: 'FETCH_CHARACTERS' })

    } catch {

        console.log('DELETE Sagas Error', error)

    }

};

//PUT Sagas
function* fetchCharacterToEdit(action) {

    try {

        const idToEdit = action.payload;

        const response = yield axios({

            method: 'GET',
            url: `/character/${idToEdit}`

        })

        const characterToEdit = response.data

        yield put({

            type: 'SET_CHARACTER_TO_EDIT',
            payload: characterToEdit

        })
    } catch (err) {

        console.log('Could fetchCharacterToEdit properly ;(', err);

    }
}

//PUT Sagas (THE ONE THAT ACTUALLY CHANGES STUFF YAAAAY)
function* finalizeCharacterEdit(action) {

    try {
        const editedCharacterToFinalize = action.payload;
        
        const response = yield axios({

            method: 'PUT',
            url: `/character/${editedCharacterToFinalize.id}`,
            data: editedCharacterToFinalize

        })
        yield put ({

            type: 'FETCH_CHARACTERS'

        })

    } catch(err) {

        console.log('finalizeCharacterEdit Sagas failed:', err);

    }
}

// GETting NPCs from specific game save
function* fetchNpcs (action) {

    try {

        const npcToGet = action.payload;

        const response = yield axios({

            method: 'GET',
            url: `/game/${npcToGet}`

        })

        const npcToRender = response.data;

        yield put({

            type: 'SEND_NPCS_TO_REDUCER',
            payload: npcToRender

        })
    } catch (err) {

        console.log('Could not send Sagas NPC GET properly ;(', err);

    }

}

// Adding Takashi Reputation (PUT)
function* addTakashiReputation(action) {

    try {
        const takashiId = action.payload;
        console.log('takashiId:', takashiId)
        
        const response = yield axios({

            method: 'PUT',
            url: `/game/takashi/${takashiId}`,
            data: takashiId

        })
        yield put ({

            type: 'FETCH_NPCS'

        })

    } catch(err) {

        console.log('addTakashiReputation Sagas failed:', err);

    }
}

// Adding Rin Reputation (PUT)
function* addRinReputation(action) {

    try {
        const rinId = action.payload;
        console.log('rinId:', rinId)
        
        const response = yield axios({

            method: 'PUT',
            url: `/game/rin/${rinId}`,
            data: rinId

        })
        yield put ({

            type: 'FETCH_NPCS'

        })

    } catch(err) {

        console.log('addRinReputation Sagas failed:', err);

    }
}

function* addOkarunReputation(action) {

    try {
        const okarunId = action.payload;
        console.log('okarunId:', okarunId)
        
        const response = yield axios({

            method: 'PUT',
            url: `/game/okarun/${okarunId}`,
            data: okarunId

        })
        yield put ({

            type: 'FETCH_NPCS'

        })

    } catch(err) {

        console.log('addOkarunReputation Sagas failed:', err);

    }
}


function* characterSaga() {

    yield takeLatest('FETCH_CHARACTERS', fetchCharacters);
    yield takeLatest('ADD_SAVE', addGame);
    yield takeLatest('DELETE_CHARACTER', deleteCharacter);
    yield takeLatest('FETCH_CHARACTER_TO_EDIT', fetchCharacterToEdit);
    yield takeLatest('FINALIZE_CHARACTER_EDIT', finalizeCharacterEdit);
    yield takeLatest('FETCH_NPCS', fetchNpcs);
    yield takeLatest('ADD_TAKASHI_REPUTATION', addTakashiReputation);
    yield takeLatest('ADD_RIN_REPUTATION', addRinReputation);
    yield takeLatest('ADD_OKARUN_REPUTATION', addOkarunReputation);

}

export default characterSaga;

