const jsonschema = require( "jsonschema" );

const express = require('express');
const router = express.Router();
const {ensureLoggedIn} = require( "../middleware/auth" );
const Plant = require( "../models/plants" );

 /** Find all plants.
   
   * Returns [{ id, sci_name, common_names, family, image_url, aspca_url}, ...]
   * */
router.get( "/", ensureLoggedIn, async function ( req, res, next )
{
  try
  {
    const plants = await Plant.findAll();
    return res.json( { plants } );
  } catch ( err )
  {
    return next( err );
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
router.get( "/:id", ensureLoggedIn, async function ( req, res, next )
{
  try
  {
    const plant = await Plant.get( req.params.id );
    
    return res.json( { plant } );
  } catch ( err )
  {
    return next( err );
  }
} );

router.post( "/name/search",
  ensureLoggedIn,
  async function ( req, res, next )
  {
    try
    {
      const plant_details =
        await Plant.searchName( `%${req.body.term.toLowerCase()}%` );

      return res.json( { plant_details } );
    } catch ( err )
    {
      return next( err );
    }
  } );
  
router.post( "/toxicity/search",
  ensureLoggedIn,
  async function ( req, res, next )
  {
    try
    {
      const toxicity_details =
        await Plant.searchToxicity( `%${req.body.term.toLowerCase()}%` );
      
      return res.json( { toxicity_details } );
    } catch ( err )
    {
      return next( err );
    }
  } )
  
module.exports = router;

