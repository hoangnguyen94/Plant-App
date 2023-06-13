import React from "react";
import { render } from "@testing-library/react";
import PlantCard from "./PlantCard";

test("renders PlantCard component correctly", () => {
	const selectedPlantData = {
	  image_url: "path/to/image",
	  name: "Plant Name",
	  sci_name: "Scientific Name",
	  family: "Plant Family",
	  common_names: ["Common Name 1", "Common Name 2"],
	  aspca_url: "https://example.com",
	  animals: [
		{ name: "Animal 1", toxic: true },
		{ name: "Animal 2", toxic: false },
	  ],
	};
  
	const { container } = render(<PlantCard selectedPlantData={selectedPlantData} />);
  
	expect(container).toMatchSnapshot();
  });
  