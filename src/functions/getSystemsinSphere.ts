import axios from 'axios';
import { ISphereSystem } from '../models';

const apiURL = 'https://www.edsm.net/api-v1/sphere-systems';

/**
 * Gets systems in a sphere radius
 * @param systemName default Arugbal
 * @param distance distance (in LY) from center. Default 50
 */
const getSystemsinSphere = async (
  systemName: string = 'Arugbal',
  distance: number = 50
) => {
  try {
    const response = await axios.get<ISphereSystem[]>(apiURL, {
      params: {
        systemName,
        radius: distance,
        showPrimaryStar: 1,
        showInformation: 1,
        showCoordinates: 1,
      },
    });

    const systemList = response.data.filter((v) => v.distance > 0);

    return systemList;
  } catch (err) {
    // this can fail if the http request fails
    throw err;
  }
};

export { getSystemsinSphere };
