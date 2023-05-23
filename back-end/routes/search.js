const express = require('express');
const router = express.Router();
const {ensureLoggedIn} = require( "../middleware/auth" );
const Plant = require( "../models/plants" );

/** Given a plant id, return data about plant.
   *
   * plant: { id, name, sci_name, common_name, family, aspca_url, image_url}
   * Where plant.id = plant_id   
   * Returns 
   * { id, name, sci_name, common_name, family, aspca_url, image_url, animal, toxic, clinical_signs}
   *
   * Authorization required: none
   **/
  
router.get( "/", ensureLoggedIn, async function ( req, res, next )
{
  try
  {
    const searchResults =
      await Plant.searchNameAndToxicity( req.query.name );
    
    res.json(searchResults);
  } catch (err) {
    next(err);
  }
} );

module.exports = router;