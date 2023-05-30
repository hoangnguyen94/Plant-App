import axios from "axios";

function usePlantData() {

  // get array of plants to populate dynamic search options
  const getPlantsArray = async () =>
  {
    console.log("get all plants")
    const response = await axios.get( "//localhost:3001/plants" );
    const data = response.data;
    console.log( data );
    return data;
  }

  const getPlantData = async ( plant_id ) =>
  {
    console.log(" get plant by")
    const data = await axios.get(`//localhost:3001/plants/${plant_id}`)
    return data;
  }

  const searchPlant = async ( value ) =>
  {
    const response = await axios.get( `//localhost:3001/plants?name=${value}` )
    const data = response.data;
    return data
  }
  return { getPlantData, getPlantsArray, searchPlant };
}

export default usePlantData;
