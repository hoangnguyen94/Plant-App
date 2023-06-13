const db = require( "../db" );
const { NotFoundError } = require( "../expressError" );


/** Related function for plant */

class Plant
{

    /** Find all plants.
   
   * Returns [{ id, sci_name, common_names, family, image_url, aspca_url}, ...]
   * */
    static async findAll ()
    {
        const result =
            await db.query( `SELECT * FROM plants;` );
        
        return result.rows;
    }

    /** Given a plant id, return data about plant.
   *
   * plant: { id, name, sci_name, common_name, family, aspca_url, image_url}
   * Where plant.id = plant_id   
   * Returns 
   * { id, name, sci_name, common_name, family, aspca_url, image_url, animal, toxic, clinical_signs}
   *
   * Throws NotFoundError if not found.
   **/
    static async get (id)
    {
        const plantQuery = db.query(
            `SELECT * 
            FROM plants
            WHERE plants.id = $1`,
            [ id ]
        );
        
        const toxicityQuery = db.query(
            `SELECT 
                animal,
                toxic,
                clinical_signs
            FROM toxicity 
            WHERE plant_id = $1
            LIMIT 3;`,
            [ id ]
        );

        const [ plantRes, toxicityRes ] = await Promise.all( [
            plantQuery,
            toxicityQuery
        ] );
        
        if(!plantRes && !toxicityRes) throw new NotFoundError(`No plant: ${id}`)
        
        const data = {
            ...plantRes.rows[ 0 ],
            toxicities: toxicityRes.rows
        }

        return data;
    };

    static async searchNameAndToxicity ( term )
    {
        
        const plantAndToxicityRes = await db.query(
          `SELECT 
            plants.id, 
            plants.name, 
            plants.sci_name,
            plants.common_names,
            plants.family,
            plants.image_url,
            toxicity.animal, 
            toxicity.toxic, 
            toxicity.clinical_signs
          FROM plants
          LEFT JOIN toxicity ON plants.id = toxicity.plant_id
          WHERE lower(sci_name) LIKE '%' || $1 || '%' 
            OR lower(common_names) LIKE '%' || $1 || '%'
            OR lower(name) LIKE '%' || $1 || '%'
        LIMIT 9;`,
          [term]
        );
        console.log( plantAndToxicityRes );
        if (!plantAndToxicityRes) {
          throw new NotFoundError(`No plant and toxicity: ${term}`);
        }
        
        const plantAndToxicityDetails = plantAndToxicityRes.rows;
      
        const combinedData = plantAndToxicityDetails.reduce((result, current) => {
            const { name, sci_name, common_names, family, image_url, animal, toxic, clinical_signs } = current;
            const key = `${name}-${sci_name}-${common_names}-${family}-${image_url}-${clinical_signs}`;
          
            if (!result[key]) {
              result[key] = { name, sci_name,common_names, family, image_url, animals: [], clinical_signs };
            }
          
            result[key].animals.push({ animal, toxic });
          
            return result;
          }, {});
        
          return Object.values(combinedData);
    };      
    
    static async searchName ( name )
    {
        const plantRes = await db.query( `
        SELECT DISTINCT 
            plants.id, 
            plants.name, 
            plants.sci_name,
            plants.common_names
        FROM plants
        WHERE lower(sci_name) LIKE $1 
          OR lower(common_names) LIKE $1 
          OR lower(name) LIKE $1
        ;`,
            [ name ] );

        if ( !plantRes ) throw new NotFoundError( `No plant: ${plantRes}` );
        
        const plant_details = plantRes.rows;
        
        return plant_details;
    }

    static async searchToxicity ( name )
    {
        const toxicityRes = await db.query(
            `SELECT toxicity.animal, toxicity.toxic, toxicity.clinical_signs
            FROM plants
            JOIN toxicity ON plants.id = toxicity.plant_id
            WHERE lower(sci_name) like $1 or lower(common_names) like $1 or lower(name) like $1
            LIMIT 3;`,
            [ name ] );
        
        if ( !toxicityRes ) throw new NotFoundError( `No toxicity value: ${term}` );
        
        const toxicity_details = toxicityRes.rows;

        return toxicity_details;
    }
}

module.exports = Plant;
