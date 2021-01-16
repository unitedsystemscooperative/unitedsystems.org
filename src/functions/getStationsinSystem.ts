import axios from 'axios';
import { ISystemStations } from 'models/stationsInSystem';

const apiURL = 'https://www.edsm.net/api-system-v1/stations';

/**
 * Gets stations within a system
 * @param systemName default Arugbal
 */
const getStationsinSystem = async (systemName: string = 'Arugbal') => {
  try {
    const response = await axios.get<ISystemStations>(apiURL, {
      params: {
        systemName,
      },
    });

    return response.data;
  } catch (err) {
    // this can fail if the http request fails
    throw err;
  }
};

export { getStationsinSystem };
