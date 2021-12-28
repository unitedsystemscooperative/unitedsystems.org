import { genericSortArray } from '@/functions/sort';

const stationTypes = [
  {
    type: 'Coriolis Starport',
    maxPadSize: 'Large',
  },
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

const notStrings = [{ a: 1 }, { a: 5 }, { a: 1 }, { a: 2 }, { a: 6 }, { a: 4 }];

describe('sort', () => {
  it('should sort strings', () => {
    const response = genericSortArray(stationTypes, { order: 'asc', orderBy: 'type' });
    expect(response).toEqual([
      {
        type: 'Coriolis Starport',
        maxPadSize: 'Large',
      },
      {
        type: 'Coriolis Starport',
        maxPadSize: 'Large',
      },
      {
        type: 'Ocellus Starport',
        maxPadSize: 'Large',
      },
      {
        type: 'Orbis Starport',
        maxPadSize: 'Large',
      },
      {
        type: 'Outpost',
        maxPadSize: 'Medium',
      },
      {
        type: 'Planetary Outpost',
        maxPadSize: 'Large',
      },
      {
        type: 'Planetary Port',
        maxPadSize: 'Large',
      },
      {
        type: 'Planetary Settlement',
        maxPadSize: 'Large',
      },
    ]);

    const response2 = genericSortArray(stationTypes, { order: 'desc', orderBy: 'type' });
    expect(response2).toEqual(
      [
        {
          type: 'Coriolis Starport',
          maxPadSize: 'Large',
        },
        {
          type: 'Coriolis Starport',
          maxPadSize: 'Large',
        },
        {
          type: 'Ocellus Starport',
          maxPadSize: 'Large',
        },
        {
          type: 'Orbis Starport',
          maxPadSize: 'Large',
        },
        {
          type: 'Outpost',
          maxPadSize: 'Medium',
        },
        {
          type: 'Planetary Outpost',
          maxPadSize: 'Large',
        },
        {
          type: 'Planetary Port',
          maxPadSize: 'Large',
        },
        {
          type: 'Planetary Settlement',
          maxPadSize: 'Large',
        },
      ].reverse()
    );
  });

  it('should sort numbers', () => {
    expect(genericSortArray(notStrings, { order: 'asc', orderBy: 'a' })).toEqual([
      { a: 1 },
      { a: 1 },
      { a: 2 },
      { a: 4 },
      { a: 5 },
      { a: 6 },
    ]);
  });
});
