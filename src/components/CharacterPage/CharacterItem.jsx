import { useHistory } from 'react-router-dom';

function CharacterItem({character}) {

    const history = useHistory();

    const handleEditClick = () => {
        history.push(`/character/edit/${character.id}`)
    }

    return (
        <li>
            <button onClick={handleEditClick}>EDIT</button>
        </li>
    )
}

export default CharacterItem;