import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import takashi from '../../images/takashi.png';
// import rin from '../../images/rin.png';
// import okarun from '../../images/okarun.png';

function TakashiPage() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    // Create useSelector for NPC To Render Store HERE:
    const npcToRender = useSelector(store => store.game);
    console.log('this is npcToRender:', npcToRender);

    const gameId = npcToRender.game_id;

    //useHistory to Return
    const handleReturnClick = () => {
        history.push(`/game/${npcToRender.game_id}`)
    }

    // useEffect to get the character id that we need to edit
    useEffect(() => {

        const gameIdToGet = params.id;
        console.log('gameIdToGet', gameIdToGet);

        dispatch({

            type: 'FETCH_NPCS',
            payload: gameIdToGet

        })

    }, [])

    const addTakashiReputation = () => {
        dispatch({

            type: 'ADD_TAKASHI_REPUTATION',
            // if error arises, look at this
            // \/ \/ \/ \/ \/ \/ \/ \/
            payload: gameId

        })

        history.push(`/game/${npcToRender.game_id}`);

    }

    return (
        <div>
            <h1 className='formPanelLong'>You found Takakshi!</h1>
            <form className="formPanel">
                <h2>Takashi asks "Do you like sports?"</h2>
                <button><img src={takashi} /></button>
                <button className='btn' onClick={handleReturnClick}>No, I don't like Sports.</button>
                <button className='btn' onClick={addTakashiReputation}>Of course I do!</button>
            </form>
        </div>
    )
}


export default TakashiPage;