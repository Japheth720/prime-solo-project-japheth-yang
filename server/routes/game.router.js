const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const idToGet = req.params.id;
    const user_id = req.user.id;
    console.log('idToGet', idToGet);
    console.log('user_id', user_id);

    const sqlQuery = `
    SELECT 
	g.id
	, g.user_id
	, g.save_name
	, gn.game_id
	, gn.npc_id
	, gn.npc_reputation
	, n.id
	, n.npc_name
	, n.graphic_img_url
	, n.bad_response
	, n.good_response
	, n.initial_response
    FROM game AS g
    INNER JOIN
    game_npcs AS gn
    ON g.id = gn.game_id
    INNER JOIN
    npcs AS n
    ON gn.npc_id = n.id
    WHERE g.id=$1
    AND g.user_id=$2;
    `

    const sqlValues = [idToGet, user_id];

    pool.query(sqlQuery, sqlValues)

        .then((dbRes) => {

            console.log('dbRes.rows[0] in NPC specific GET:', dbRes.rows[0])
            res.send(dbRes.rows[0])

        })
        .catch((dbErr) => {

            console.log('GETting specifc NPC ID has failed routerside', dbErr);
            res.sendStatus(500);

        })

});

// TAKASHI PUT ROUTE
router.put('/takashi/:id', rejectUnauthenticated, (req,res) => {

    
    const characterId = req.params.id;
    // const userId = req.user.id;

  
    console.log('characterId from PUT router', characterId);
    // console.log('userId from PUT router', userId);

    const sqlQuery = `
    UPDATE "game_npcs"
      SET "npc_reputation"=1
      WHERE "npc_id"=1
        AND "game_id"=$1;
    `

    const sqlValues = [characterId];

    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {

            res.sendStatus(200);

        })
        .catch((dbErr) => {

            console.log('YOUR PUT ROUTE FAILED FOR TAKASHI, YOU FAILED AHHHH', dbErr);
            res.sendStatus(500);
            
        })

  })

  // RIN PUT ROUTE
  router.put('/rin/:id', rejectUnauthenticated, (req,res) => {

    
    const characterId = req.params.id;
    // const userId = req.user.id;

  
    console.log('characterId from PUT router', characterId);
    // console.log('userId from PUT router', userId);

    const sqlQuery = `
    UPDATE "game_npcs"
      SET "npc_reputation"=1
      WHERE "npc_id"=2
        AND "game_id"=$1;
    `

    const sqlValues = [characterId];

    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {

            res.sendStatus(200);

        })
        .catch((dbErr) => {

            console.log('YOUR PUT ROUTE FAILED FOR RIN, YOU FAILED AHHHH', dbErr);
            res.sendStatus(500);
            
        })

  })

  // OKARUN PUT ROUTE
  router.put('/okarun/:id', rejectUnauthenticated, (req,res) => {

    
    const characterId = req.params.id;
    // const userId = req.user.id;

  
    console.log('characterId from PUT router', characterId);
    // console.log('userId from PUT router', userId);

    const sqlQuery = `
    UPDATE "game_npcs"
      SET "npc_reputation"=1
      WHERE "npc_id"=3
        AND "game_id"=$1;
    `

    const sqlValues = [characterId];

    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {

            res.sendStatus(200);

        })
        .catch((dbErr) => {

            console.log('YOUR PUT ROUTE FAILED FOR OKARUN, YOU FAILED AHHHH', dbErr);
            res.sendStatus(500);
            
        })

  })


module.exports = router;