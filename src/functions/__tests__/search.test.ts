import { genericSearchArray } from '@/functions/search';

const stationTypes = [
  {
    type: 'Coriolis Starport',
    maxPadSize: 'Large',
  },
  {
    type: 'Orbis Starport',
    maxPadSize: 'Large',
  },
  {
    type: 'Ocellus Starport',
    maxPadSize: 'Large',
  },
  {
    type: 'Outpost',
    maxPadSize: 'Medium',
  },
  {
    type: 'Planetary Settlement',
    maxPadSize: 'Large',
  },
  {
    type: 'Planetary Outpost',
    maxPadSize: 'Large',
  },
  {
    type: 'Planetary Port',
    maxPadSize: 'Large',
  },
];

const dates = [
  {
    name: 'test1',
    date: new Date(2021, 0, 1),
  },
  {
    name: 'test2',
    date: new Date(2020, 0, 1),
  },
];

const incongruentData = [
  {
    name: 'string',
    p: 'not always here',
    ob: { h: 'lala' },
  },
  {
    name: 'doo',
    ob: { h: 'lala' },
  },
  {
    name: 'dah',
    p: 'not always',
    ob: { h: 'lala' },
  },
];

describe('search array', () => {
  it('should return all items if no query', () => {
    const response = genericSearchArray(stationTypes, '');
    expect(response.length).toBe(stationTypes.length);
  });

  it('should find string in array', () => {
    const response = genericSearchArray(stationTypes, 'Large');
    expect(response.length).toBe(6);
    const response2 = genericSearchArray(stationTypes, 'Outpost');
    expect(response2.length).toBe(2);
  });

  it('should find date in array', () => {
    const response = genericSearchArray(dates, '2021-01-01');
    expect(response.length).toBe(1);
  });

  it('should return only appropriate data', () => {
    const response = genericSearchArray(incongruentData, 'here');
    expect(response.length).toBe(1);

    const response2 = genericSearchArray(incongruentData, 'not always');
    expect(response2.length).toBe(2);
  });
});
