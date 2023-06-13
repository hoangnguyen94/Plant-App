import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SearchForm from './SearchForm';
import "mutationobserver-shim";

describe('SearchForm component', () => {
  test('renders SearchForm component correctly', () => {
    const setSelectedPlantData = jest.fn();

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <SearchForm setSelectedPlantData={setSelectedPlantData} />
      </Router>
    );

    expect(container).toMatchSnapshot();
  });

  test('searches for plants and selects an option', async () => {
	const setSelectedPlantData = jest.fn();
	  setSelectedPlantData(
		  {
			  id: 1,
			  name: 'Name',
			  sci_name: 'plant Sci_name'
		  } )  
	const optionTextMatcher = (content, element) => {
		const hasDesiredText = Array.from(element.childNodes).some((node) => {
		  if (node.nodeType === Node.TEXT_NODE) {
			const text = node.textContent.trim();
			return text.includes('Plant Name');
		  }
		  return false;
		});
	  
		return hasDesiredText && element.tagName.toLowerCase() === 'li';
	  };
	  
    const history = createMemoryHistory();
    const { getByPlaceholderText, findByText } = render(
      <Router history={history}>
        <SearchForm setSelectedPlantData={setSelectedPlantData} />
      </Router>
	);
	
    const searchInput = getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Plant Name' } });

    expect(setSelectedPlantData).toHaveBeenCalledWith({
      id: expect.any(Number),
      name: expect.any(String),
      sci_name: expect.any(String),
    });
  });
});
