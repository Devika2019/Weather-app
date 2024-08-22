import axios from 'axios';
import { fetchCountries } from '../../services/countryService'; 

// Mock axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchCountries', () => {
  it('should fetch countries data successfully', async () => {
    // Arrange
    const mockData = {
      data: [
        { country: 'Country 1' },
        { country: 'Country 2' },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: { data: mockData.data } });

    // Act
    const result = await fetchCountries();

    // Assert
    expect(result).toEqual(mockData.data);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://countriesnow.space/api/v0.1/countries');
  });

  it('should handle errors during fetch', async () => {
    // Arrange
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    // Act & Assert
    await expect(fetchCountries()).rejects.toThrow(errorMessage);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://countriesnow.space/api/v0.1/countries');
  });
});
