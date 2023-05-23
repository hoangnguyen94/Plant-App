import React, { useState } from "react";

import PlantApi from "../api/api";
import PlantCardList from "./PlantCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../hooks/SearchForm";

/** Show page with list of plants.
 *
 * On mount, loads plants from API.
 * Re-loads filtered plants on submit from search form.
 *
 * PlantList -> PlantCardList -> PlantCard
 *
 * This is routed to at /plants
 */

function PlantList() {
  console.debug("PlantList");

  const [plants, setPlants] = useState(null);

  /** Triggered by search form submit; reloads plants. */
  async function search() {
    let plants = await PlantApi.getPlants();
    setPlants( plants );
    console.log(`plants: ${plants}`)
  }
  search();
  if (!plants) return <LoadingSpinner />;
  
  return (
      <div className="PlantList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {plants.length
            ? <PlantCardList plants={plants} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
  );
}

export default PlantList;