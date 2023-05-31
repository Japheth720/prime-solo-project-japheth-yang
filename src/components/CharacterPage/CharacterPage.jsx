import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



function CharacterPage () {

    const dispatch = useDispatch();
    
    const history = useHistory();

    useEffect(() => {

        dispatch({ type: 'GET_CHARACTERS'});

    }, []);

    return (
    
        <div>
            <h1>this is character page</h1>
        </div>

    );
};

export default CharacterPage;