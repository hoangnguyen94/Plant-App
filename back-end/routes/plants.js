
const express = require('express');
const router = express.Router();
const {ensureLoggedIn} = require( "../middleware/auth" );
const Plant = require( "../models/plants" );

 /** Find all plants.
   
   * Returns [{ id, sci_name, common_names, family, image_url, aspca_url}, ...]
   * */

 router.get("/", async function (req, res, next) {
  try {
    const { name } = req.query; // Retrieve the name query parameter

    let plants;

    if (name) {
      // If name is provided, filter the plants based on the name
      plants = await Plant.searchNameAndToxicity(name);
    } else {
      // If name is not provided, retrieve all plants
      plants = await Plant.findAll();
    }

    return res.json({ plants });
  } catch (err) {
    return next(err);
  }
 } );

 /** Given a plant id, return data about plant.
   *
   * plant: { id, name, sci_name, common_name, family, aspca_url, image_url}
   * Where plant.id = plant_id   
   * Returns 
   * { id, name, sci_name, common_name, family, aspca_url, image_url, animal, toxic, clinical_signs}
   *
   * Authorization required: none
   **/
router.get( "/:id", async function ( req, res, next )
{
  try
  {
    const plant = await Plant.get( req.params.id );
    
    console.log("plant id debug", req.params.id)
    return res.json( { plant } );
  } catch ( err )
  {
    return next( err );
  }
} );


module.exports = router;

