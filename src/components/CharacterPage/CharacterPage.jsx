import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



function CharacterPage () {

    const dispatch = useDispatch();

    const characters = useSelector(store => store.characters);

    const history = useHistory();

    useEffect(() => {

        dispatch({ type: 'FETCH_CHARACTERS'});

    }, []);

    return (
    
        <div>
            <h1>this is character page</h1>
            <h2>Testing If Data Was Sent: {characters.save_name}</h2>
        </div>

    );
};

export default CharacterPage;