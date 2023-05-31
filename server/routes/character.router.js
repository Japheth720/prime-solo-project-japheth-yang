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
  g.id game_id
  , g.user_id
  , u.username
  , g.save_name
  , gnpc.id game_npc_id
  , gnpc.npc_reputation
  , npc.id npc_id
  , npc.npc_name
  , npc.graphic_img_url
  , npc.initial_response
  , npc.good_response
  , npc.bad_response
FROM
  game g
  , game_npcs gnpc
  , npcs npc
  , "user" u
WHERE
  g.id = gnpc.game_id
  AND gnpc.npc_id = npc.id
  AND u.id = g.user_id
  AND g.save_name = 'LungTest';
  `;

  pool.query(query)
  .then( result => {
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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;