
const request = require('supertest');
const app = require('../app');
const Plant = require('../models/plants');



jest.mock( '../models/plants' );


describe('GET /plants', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all plants when no name query parameter is provided', async () => {
    // Mock the Plant.findAll method to return dummy plant data
    const dummyPlants = [{ id: 1, name: 'Plant 1' }, { id: 2, name: 'Plant 2' }];
    Plant.findAll.mockResolvedValue(dummyPlants);

    const response = await request(app)
      .get('/plants')
      .expect(200);

    expect(response.body).toEqual({ plants: dummyPlants });
  });

  it('should return filtered plants when name query parameter is provided', async () => {
    // Mock the Plant.searchNameAndToxicity method to return dummy plant data
    const dummyFilteredPlants = [{ id: 1, name: 'Filtered Plant 1' }];
    Plant.searchNameAndToxicity.mockResolvedValue(dummyFilteredPlants);

    const response = await request(app)
      .get('/plants?name=Filtered')
      .expect(200);

    expect(response.body).toEqual({ plants: dummyFilteredPlants });
  });

  it('should return an error when an exception is thrown', async () => {
    // Mock the Plant.findAll method to throw an error
    const error = new Error('Database error');
    Plant.findAll.mockRejectedValue(error);

    const response = await request(app)
      .get('/plants')
      .expect(500);

    expect(response.body).toEqual({ error: { message: error.message, status: 500 } });
  });
});


