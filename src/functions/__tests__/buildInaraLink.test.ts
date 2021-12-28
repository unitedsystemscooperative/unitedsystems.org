import { buildInaraLink } from '@/functions/buildInaraLink';

describe('Build Inara Link', () => {
  it('should build a system', () => {
    const response = buildInaraLink('system', 'HIP 4120');
    expect(response).toEqual('https://inara.cz/starsystem/?search=HIP%204120');
  });

  it('should build a station', () => {
    const response = buildInaraLink('station', 'Meany Dock');
    expect(response).toEqual('https://inara.cz/station/?search=Meany%20Dock');
  });

  it('should build a fleet carrier', () => {
    const response = buildInaraLink('fleetcarrier', 'HYZ-321');
    expect(response).toEqual('https://inara.cz/station/?search=HYZ-321');
  });

  it('should build a faction', () => {
    const response = buildInaraLink('minorfaction', 'United Systems Cooperative');
    expect(response).toEqual(
      'https://inara.cz/minorfaction/?search=United%20Systems%20Cooperative'
    );
  });
});
