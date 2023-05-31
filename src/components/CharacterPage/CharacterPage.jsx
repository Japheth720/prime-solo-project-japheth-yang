import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



function CharacterPage() {

    const dispatch = useDispatch();

    const characters = useSelector((store) => store.characters);

  

    const history = useHistory();

    const [gameSave, setGameSave] = useState("");
    // let newGameId = characters.length / 3;


    useEffect(() => {

        dispatch({ type: 'FETCH_CHARACTERS' });
        console.log('CharacterPage Component', characters);
    }, [dispatch]);

    function addGameSave(event) {
        event.preventDefault;

        console.log('gameSave value:', gameSave);
        dispatch({

            type: 'ADD_SAVE',
            payload: {
                game_save: gameSave,
                // new_game_id: newGameId + 1,  
            }

        })

        setGameSave("");

    }

    //Delete Character Route
    const deleteCharacter = (item) => {
        console.log('deleteCharacter item.id', item.id);
        dispatch({

            type: 'DELETE_CHARACTER',
            payload: item.id

        })

    }

    return (

        <div>
            <h1>this is character page</h1>

            <form onSubmit={addGameSave}>

                <input
                    placeholder="Add a New Save File!"
                    typeof="text"
                    value={gameSave}
                    onChange={(event) => setGameSave(event.target.value)}
                />

                <button type='submit'>Add New Game</button>
            </form>


            <table>

                <thead>
                    <tr>
                        <th>Character Name</th>
                        <th>Friendship Progress</th>
                        <th>Select!</th>
                        <th>Delete.</th>
                    </tr>
                </thead>

                <tbody>

                    {characters.map((item) => {
                        return (
                            <tr>
                                
                                <td>{item.save_name}</td>
                                <td>{item.sum}/3</td>
                                <td><button>SELECT</button></td>
                                <td><button onClick={() => {deleteCharacter(item)}}>DELETE</button></td>
                            </tr>
                        )

                    })}

                </tbody>

            </table>


        </div>

    );
};

export default CharacterPage;