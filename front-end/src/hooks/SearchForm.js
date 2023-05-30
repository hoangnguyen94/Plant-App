import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import usePlantData from './usePlantData';
import React, { useState } from 'react';
import { TextField, Stack, Autocomplete } from '@mui/material';

const SearchForm = ({setSelectedPlantData}) => {
  const history = useHistory();
  const { searchPlant } = usePlantData();

  const [plants, setPlants] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleOnSubmit = (option) => {
    setSelectedPlantData( option );
    console.log( option.data );
    history.push( `/plants?name=${option.name}` );
    setOpen(false);
    setInputValue('');
  };

  const handleInputChange = async (e, name, reason) => {
    setInputValue(name);
    const results = await searchPlant(name);

    const plantsArray = Array.isArray(results) ? results : [results];
    const extractedPlants = plantsArray[0] && plantsArray[0].plants ? plantsArray[0].plants : [];
    let plantsWithId = extractedPlants.map((plant) => {
      return { ...plant, id: uuid() };
    });
    setPlants( plantsWithId );
    setOpen(!!name);
  };

  const filteredOptions = plants.filter((option) =>
    option.name && option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Stack sx={{ padding: 2, width: { xs: 200, sm: 400, md: 570 } }}>
      <Autocomplete
        clearOnBlur
        open={open}
        onOpen={() => {
          if (inputValue) {
            setOpen(true);
          }
        }}
        onClose={() => setOpen(false)}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        popupIcon={<SearchIcon />}
        noOptionsText="We can't find your plant."
        getOptionLabel={(option) => `${option.name} ${option.sci_name}`}
        options={filteredOptions}
        renderInput={(params) => <TextField {...params} placeholder="Search..." />}
        renderOption={(props, option) => {
          return (
            <li
              {...props}
              key={option.id}
              onClick={() => {
                handleOnSubmit(option);
              }}
            >
              <Typography>
                {option.name} -
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                <i>{option.sci_name}</i>
              </Typography>
            </li>
          );
        }}
      />
    </Stack>
  );
};

export default SearchForm;
