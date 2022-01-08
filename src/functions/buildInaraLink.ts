type InaraSearchType = 'system' | 'station' | 'fleetcarrier' | 'minorfaction';
const INARA_BASE_URL = 'https://inara.cz';

/**
 *
 * @param type
 * @param value Station must be arranged "System [Station]"
 * @returns
 */
export const buildInaraLink = (
  type: InaraSearchType,
  value: string
): string => {
  switch (type) {
    case 'system':
      return `${INARA_BASE_URL}/starsystem/?search=${encodeURIComponent(
        value
      )}`;
    case 'station':
      return `${INARA_BASE_URL}/station/?search=${encodeURIComponent(value)}`;
    case 'fleetcarrier':
      return `${INARA_BASE_URL}/station/?search=${encodeURIComponent(value)}`;
    case 'minorfaction':
      return `${INARA_BASE_URL}/minorfaction/?search=${encodeURIComponent(
        value
      )}`;
  }
};
