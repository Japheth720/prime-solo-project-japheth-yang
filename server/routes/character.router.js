const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const {
//     rejectUnauthenticated,
//   } = require('../modules/authentication-middleware');

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