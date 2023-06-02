const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('inside the character GET route');
    const user_id = req.user.id;

    const query = `

    SELECT game.save_name, SUM(game_npcs.npc_reputation), game.id
    FROM game
    JOIN game_npcs ON game.id = game_npcs.game_id
    WHERE game.user_id = $1
    GROUP BY game.save_name, game.id;
    
  `;

    pool.query(query, [user_id])
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




// DELETE ROUTE

router.delete('/:id', rejectUnauthenticated, (req, res) => {

    const game_id = req.params.id;
   
    const sqlValue = [game_id];
    const queryText = `
    DELETE FROM "game"
    WHERE "game".id=$1;
    `;

    pool
      .query(queryText, sqlValue)

      .then(() => res.sendStatus(201))

      .catch((err) => {

        console.log('character delete failed: ', err);
        res.sendStatus(500);

      });
    
  });


  //PUT ROUTE
  //PUT GET Specific Character
  router.get('/:id', rejectUnauthenticated, (req, res) => {

    const idToUpdate = req.params.id;
    const user_id = req.user.id;
  
    const sqlQuery = `
    SELECT * FROM "game"
      WHERE "game".id=$1
        AND "user_id"=$2;
    `
  
    const sqlValues = [idToUpdate, user_id];
  
    pool.query(sqlQuery, sqlValues)

      .then((dbRes) => {

        console.log('dbRes.rows[0] in character specific GET:', dbRes.rows[0])
        res.send(dbRes.rows[0])

      })
      .catch((dbErr) => {

        console.log('GETting specifc ID has failed routerside', dbErr);
        res.sendStatus(500);

      })
  })

module.exports = router;