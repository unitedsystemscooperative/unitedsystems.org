import axios from 'axios';
import { ISystemBodies } from 'models';

const apiURL = 'https://www.edsm.net/api-system-v1/bodies';

/**
 * Gets celestial bodies within a system
 * @param systemName default Arugbal
 */
const getBodiesinSystem = async (systemName: string = 'Arugbal') => {
  try {
    const response = await axios.get<ISystemBodies>(apiURL, {
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

export { getBodiesinSystem };
