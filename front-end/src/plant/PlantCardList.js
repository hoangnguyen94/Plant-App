import React from "react";
import PlantCard from "./PlantCard";

/** Show list of job cards.
 *
 * Used by both JobList and CompanyDetail to list jobs. Receives an apply
 * func prop which will be called by JobCard on apply.
 *
 * PlantList -> PlantCardList -> JobCard
 *
 */

function PlantCardList({ plants }) {
  console.debug("PlantCardList", "plants=", plants);

  return (
      <div className="PlantCardList">
        {plants.map(plant => (
            <PlantCard
                key={plants.id}
                name={plants.name}
                sci_name={plant.sci_name}
                family={plants.family}
                image_url={plants.image_url}
                aspca_url={plant.aspca_url}
            />
        ))}
      </div>
  );
}

export default PlantCardList;
