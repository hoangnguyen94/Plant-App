import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHorse, faCat, faDog } from "@fortawesome/free-solid-svg-icons";

const Toxicity = ({ selectedPlantData }) => {
  const {
    animals,
    clinical_signs,
  } = selectedPlantData;
  console.log( animals );
  const toxicities = animals.filter((animal) => animal.toxic === true);
  console.log( toxicities );
  return (
    <Container align="center">
      <Typography paddingTop={5} variant="h4" margin={2} sx={{ textAlign: "center" }}>
        Animal Toxicity
      </Typography>
      <Typography variant="subtitle2" margin={2} sx={{ textAlign: "center", color: "text.secondary" }}>
        <i>It may be dangerous to the animals displayed below if consumed: </i>
      </Typography>
      <Box sx={{ flexDirection: "row", padding: 3 }} align="center">
        <Typography component={"span"} variant="h1" sx={{ textAlign: "center" }}>
          {toxicities.map((obj, index) => {
            if (obj.animal === "horse" && obj.toxic === true)
              return <FontAwesomeIcon icon={faHorse} key={index} />;
            else if (obj.animal === "cat" && obj.toxic === true)
              return <FontAwesomeIcon icon={faCat} key={index} />;
            else if (obj.animal === "dog" && obj.toxic === true)
              return <FontAwesomeIcon icon={faDog} key={index} />;
            return null; // Add a fallback return statement
          })}
        </Typography>
      </Box>
      <Box mb={5} />

      <Container>
        <Typography variant="body1" paddingTop={3} sx={{ color: "text.secondary" }}>
          Clinical signs:
        </Typography>
        <Typography variant="body1" paddingBottom={4}>
          {clinical_signs}
        </Typography>
      </Container>
    </Container>
  );
};

export default Toxicity;
