import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



function CharacterPage() {

    const dispatch = useDispatch();

    const characters = useSelector((store) => store.characters);

    console.log('CharacterPage Component', characters);

    const history = useHistory();

    const [gameSave, setGameSave] = useState("");


    useEffect(() => {

        dispatch({ type: 'FETCH_CHARACTERS' });

    }, [dispatch]);

    function addGameSave(event) {
        event.preventDefault;
        dispatch({

            type: 'ADD_SAVE',
            payload: {
                game_save: gameSave,
            }

        })

        setGameSave("");

    }

    return (

        <div>
            <h1>this is character page</h1>

            <form onSubmit={addGameSave}>
                
                <input
                    placeholder="game save"
                    typeof="text"
                    value={gameSave}
                    onChange={(event) => setGameSave(event.target.value)}
                />

                <button type='submit'>Add New Game</button>
            </form>

            {characters.map((item) => {
                return (<table>
                    <tr>
                        <th>{item.game_id}</th>
                        <th>{item.user_id}</th>
                        <th>{item.username}</th>
                        <th>{item.save_name}</th>
                        <button>SELECT</button>
                        <button>DELETE</button>
                    </tr>

                </table>);
            })}

        </div>

    );
};

export default CharacterPage;