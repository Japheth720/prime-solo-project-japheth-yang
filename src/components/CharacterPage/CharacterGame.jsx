import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


function CharacterGame({character}) {

    const history = useHistory();

    // const npcToRender = useSelector(store => store.game);

    const handleSelectClick = () => {
        history.push(`/game/${character.id}`)
    }

    return (
    
            <button className="btn_asLink" onClick={handleSelectClick}>SELECT</button>
        
    )
}

export default CharacterGame;