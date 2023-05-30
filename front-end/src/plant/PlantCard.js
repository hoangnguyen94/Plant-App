//PlantCard Component
import React from "react";
import Toxicity from "../toxicity/Toxicity";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Container,
  CircularProgress,
  Paper,
  StepConnector
} from "@mui/material";

import "./PlantCard.css";


function PlantCard({ selectedPlantData }) {

  console.log(JSON.stringify(selectedPlantData))
  if ( selectedPlantData )
  {

    return (
      <Container sx={{ width: { md: 800 } }}>
        <Box mt={2} />
        <Container sx={{ textAlign: "center" }}>
          <div className="plant-img-container">
            <img src={selectedPlantData.image_url} alt={"plant_image"} />
          </div>

        </Container>

        <Typography paddingTop={4} variant="h4" margin={2} sx={{ textAlign: "center" }}>
          {selectedPlantData.name}
        </Typography>
        <Typography
          variant="subtitle2"
          margin={2}
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          <i>
            {selectedPlantData.sci_name}
          </i>
        </Typography>

        <Accordion
          elevation={3}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Details
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Learn more about this plant
            </Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Family:
            </Typography>
            {selectedPlantData.family} <br /><br />

            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Common names:

            </Typography>

            {selectedPlantData.common_names}<br /><br />
            <StepConnector />
            <br />
            <Typography sx={{ color: "text.secondary" }}>
              Additional Information:
              <br />
            </Typography>
            <a href={selectedPlantData.aspca_url} target="_blank" rel="noopener noreferrer">
              {selectedPlantData.aspca_url}
            </a>
          </AccordionDetails>
        </Accordion>

        <Box mb={5} />
        <Paper elevation={4}>
          <Toxicity selectedPlantData={selectedPlantData} />
        </Paper>

        <Box mb={15} />


      </Container>
    );

  }
  else
  {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }
}

export default PlantCard;
