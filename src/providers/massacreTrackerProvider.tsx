import { IMassacreContext } from 'models/massacreContext';
import { IMassacreTrack } from 'models/massacreTrack';
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import massacreDefaults from 'data/massacre/massacreDefaults.json';

export const MassacreContext = createContext<IMassacreContext | null>(null);

type trackerAction =
  | { type: 'add'; tracker: IMassacreTrack }
  | { type: 'update'; tracker: IMassacreTrack; hazRezSystem: string }
  | { type: 'delete'; tracker: IMassacreTrack }
  | { type: 'set'; trackers: IMassacreTrack[] };

export const MassacreContextProvider = (props: { children: ReactNode }) => {
  const reducer = (prevTrackers: IMassacreTrack[], action: trackerAction) => {
    switch (action.type) {
      case 'add':
        const trackerToAdd = action.tracker;
        if (prevTrackers) {
          const foundTracker = prevTrackers.find(
            (x) =>
              x.hazRezSystem.toLowerCase() ===
              trackerToAdd.hazRezSystem.toLowerCase()
          );
          if (foundTracker) {
            throw new Error(
              `Tracker for ${trackerToAdd.hazRezSystem} already exists.`
            );
          }
          return [...prevTrackers, trackerToAdd];
        } else {
          return [trackerToAdd];
        }
      case 'update':
        const hazRezSystem = action.hazRezSystem;
        const trackerToUpdate = action.tracker;
        if (prevTrackers.length > 0) {
          const trackerIndex = prevTrackers.findIndex(
            (x) => x.hazRezSystem === hazRezSystem
          );
          if (trackerIndex === -1) {
            return [...prevTrackers, trackerToUpdate];
          }
          const newTrackers = [
            ...prevTrackers.slice(0, trackerIndex),
            trackerToUpdate,
            ...prevTrackers.slice(trackerIndex + 1),
          ];
          return newTrackers;
        } else {
          return [trackerToUpdate];
        }
      case 'delete':
        const trackerToDelete = action.tracker;
        if (prevTrackers) {
          const index = prevTrackers.indexOf(trackerToDelete);
          return [
            ...prevTrackers.slice(0, index),
            ...prevTrackers.slice(index + 1),
          ];
        } else {
          return [];
        }
      case 'set':
        return action.trackers;
      default:
        throw new Error('No action exists for that tracker action.');
    }
  };

  const [trackers, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (window) {
      const store: IMassacreTrack[] | null = JSON.parse(
        window.localStorage.getItem('massacreTrackerStore')
      );
      if (store && store.length > 0) {
        dispatch({ type: 'set', trackers: store });
      } else {
        const defaultTrackers: IMassacreTrack[] = massacreDefaults;
        dispatch({ type: 'set', trackers: defaultTrackers });
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      'massacreTrackerStore',
      JSON.stringify(trackers)
    );
    console.log('wrote to storage');
  }, [trackers]);

  const [selectedTab, setSelectedTab] = useState<string>(() => {
    if (trackers && trackers.length > 0) {
      const selectedTrack = trackers.find((x) => x.current === true);
      if (selectedTrack) {
        return selectedTrack.hazRezSystem;
      } else {
        return 'Bibaridji';
      }
    } else {
      return 'Bibaridji';
    }
  });

  const addTracker = (newTracker: IMassacreTrack) => {
    let response = '';
    try {
      dispatch({ type: 'add', tracker: newTracker });
    } catch (e) {
      response = e.message;
    }
    return response;
  };

  const updateTracker = (hazRezSystem: string, newTracker: IMassacreTrack) => {
    console.log('Update Tracker');

    dispatch({ type: 'update', hazRezSystem, tracker: newTracker });
  };

  const deleteTracker = (tracker: IMassacreTrack) => {
    dispatch({ type: 'delete', tracker });
  };

  const wrapper: IMassacreContext = {
    trackers,
    addTracker,
    updateTracker,
    deleteTracker,
    selectedTab,
    setSelectedTab,
  };

  return (
    <MassacreContext.Provider value={wrapper}>
      {props.children}
    </MassacreContext.Provider>
  );
};
