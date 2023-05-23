import axios from "axios";

function usePlantData() {

  // get array of plants to populate dynamic search options
  const getPlantsArray = async () =>
  {
    console.log("get all plants")
    const data = await axios.get( "//localhost:3001/plants" );
    console.log( data );
    return data;
  }

  const getPlantData = async ( plant_id ) =>
  {
    console.log(" get plant by")
    const data = await axios.get(`//localhost:3001/plants/${plant_id}`)
    return data;
  }

  return { getPlantData, getPlantsArray };
}
export default usePlantData;