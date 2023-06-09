import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function CharacterEditPage() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    // Create useSelector for Character To Edit Store HERE:
    // charcterToEdit = useSelector(store => store.)
    const characterToEdit = useSelector(store => store.characterToEdit);

    // useEffect to get the character id that we need to edit
    useEffect(() => {

        const idToEdit = params.id;

        dispatch({

            type: 'FETCH_CHARACTER_TO_EDIT',
            payload: idToEdit

        })

    }, [])

    // handleUserTyping
    const handleUserTyping = (e) => {
        dispatch({
            type: 'MODIFY_CHARACTER_NAME',
            payload: e.target.value
        })
    }


    //Finalizing Character Name Change
    const finalizeThingEdit = () => {
        dispatch({

            type: 'FINALIZE_CHARACTER_EDIT',
            // if error arises, look at this
            // \/ \/ \/ \/ \/ \/ \/ \/
            payload: characterToEdit

        })

        history.push('/character');

    }


    return (

        <div className='formPanel'>
            <h2>Change your Character Name!</h2>
            <h3>{characterToEdit.save_name}</h3>
            <form onSubmit={finalizeThingEdit}>
                <input
                    type="text"
                    value={characterToEdit.name}
                    onChange={handleUserTyping}
                />
                <button>Confirm Name Change</button>
            </form>
        </div>

    )

}

export default CharacterEditPage;