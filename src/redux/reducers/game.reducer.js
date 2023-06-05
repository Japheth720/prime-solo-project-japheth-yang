const game = (state = [], action) => {

    switch (action.type) {
        case 'SEND_NPCS_TO_REDUCER':
            return action.payload;
        default:
            return state;
    }

};

export default game;
