import { useHistory } from 'react-router-dom';

function CharacterItem({character}) {

    const history = useHistory();

    const handleEditClick = () => {
        history.push(`/character/edit/${character.id}`)
    }

    return (
       
            <button onClick={handleEditClick}>EDIT</button>
       
    )
}

export default CharacterItem;