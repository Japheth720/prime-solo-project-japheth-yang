import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import takashi from '../../images/takashi.png';
import rin from '../../images/rin.png';
import okarun from '../../images/okarun.png';

function GamePage() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    // Create useSelector for NPC To Render Store HERE:
    const npcToRender = useSelector(store => store.game);
    console.log('this is npcToRender:', npcToRender);

    // useHistory
    const handleTakashiClick = () => {
        history.push(`/game/takashi/${npcToRender.game_id}`)
    }

    const handleRinClick = () => {
        history.push(`/game/rin/${npcToRender.game_id}`)
    }

    const handleOkarunClick = () => {
        history.push(`/game/okarun/${npcToRender.game_id}`)
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



    return (
        <div>
            <h1 className='formPanelLong'>Choose a Character to Talk to!</h1>
            <form className="formPanel">
                <button onClick={handleTakashiClick}><img src={takashi} /></button>
                <button onClick={handleRinClick}><img src={rin} /></button>
                <button onClick={handleOkarunClick}><img src={okarun} /></button>
            </form>
        </div>
    )
}


export default GamePage;