const characterToEdit = ( state={}, action ) => {

    if ( action.type === 'SET_CHARACTER_TO_EDIT' ) {

        return action.payload;

    } else if ( action.type === 'MODIFY_CHARACTER_NAME') {

        return {...state, name: action.payload}

    }
    return state;
}

export default characterToEdit;