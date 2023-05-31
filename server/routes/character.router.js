const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
    console.log('inside the character GET route');

    const query = `
  SELECT
	game_id
	, game.user_id
	, "user".username
    , game.save_name
	, game_npcs.id
	, game_npcs.npc_reputation
	, npcs.id
	, npcs.npc_name
    , npcs.graphic_img_url
    , npcs.initial_response
    , npcs.good_response
    , npcs.bad_response
FROM
	game
	, game_npcs
	, npcs
	, "user"
WHERE
	game.id = game_npcs.game_id
	AND game_npcs.npc_id = npcs.id
	AND "user".id = game.user_id
	;
  `;

    pool.query(query)
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => {

            console.log('character.router.js GET error!', err);
            res.sendStatus(500);

        });

});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    // POST route code here
    const user_id = req.user.id;
    const save_name = req.body.game_save;
    // const new_game_id = req.body.new_game_id;


    //FIX QUERY TEXT
    //   const queryText = `
    //     INSERT INTO "game" (user_id, save_name)
    //     VALUES ($1, $2);
    //     INSERT INTO "game_npcs" (game_id, npc_id, npc_reputation)
    //     VALUES ($3, 1, 0), ($3, 2, 0), ($3, 3, 0);`;

    const queryText1 = `INSERT INTO "game" (user_id, save_name) VALUES ($1, $2);`;
    const queryText2 = `SELECT "game".id FROM "game" WHERE game.user_id=$1 AND "game".save_name=$2;`;
    const queryText3 = `INSERT INTO "game_npcs" (game_id, npc_id, npc_reputation) VALUES ($1, 1, 0), ($1, 2, 0), ($1, 3, 0);`;
    // const queryText4 = `INSERT INTO "game_npcs" (game_id, npc_id, npc_reputation) VALUES ($1, 2, 0);`;

    pool
        .query(queryText1, [user_id, save_name])
        .then(
            // querytext2
            pool.query(queryText2, [user_id, save_name])
                .then(result => {
                    console.log("result.rows", result.rows);
                    let new_game_id = result.rows[0].id;
                    // querytext3!!!
                    pool.query(queryText3, [new_game_id])
                        .then(result => {

                            res.sendStatus(200);

                        })
                        .catch((err) => {
                            res.sendStatus(500);

                        })


                })
                .catch((err) => {

                    console.log('Character Creation Failed', err);
                    res.sendStatus(500);

                })

        )
        .catch((err) => {
            console.log('User registration failed: ', err);
            res.sendStatus(500);
        });

});

module.exports = router;