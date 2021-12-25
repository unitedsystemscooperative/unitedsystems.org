import massacreDefaults from '@@/massacre/data/massacreDefaults.json';
import { IMassacreTrack } from '@@/massacre/massacreTrack';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react';

export interface IMassacreContext {
  trackers: IMassacreTrack[];
  addTracker: (newTracker: IMassacreTrack) => string;
  updateTracker: (hazRezSystem: string, newTracker: IMassacreTrack) => void;
  deleteTracker: (tracker: IMassacreTrack) => void;
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}
export const MassacreContext = createContext<IMassacreContext | null>(null);

type trackerAction =
  | { type: 'add'; tracker: IMassacreTrack }
  | { type: 'update'; tracker: IMassacreTrack; hazRezSystem: string }
  | { type: 'delete'; tracker: IMassacreTrack }
  | { type: 'set'; trackers: IMassacreTrack[] };

const reducer = (prevTrackers: IMassacreTrack[], action: trackerAction) => {
  switch (action.type) {
    case 'add':
      const trackerToAdd = action.tracker;
      trackerToAdd.hazRezSystem = trackerToAdd.hazRezSystem.toUpperCase();
      if (prevTrackers) {
        const foundTracker = prevTrackers.find(
          (x) => x.hazRezSystem.toLowerCase() === trackerToAdd.hazRezSystem.toLowerCase()
        );
        if (foundTracker) {
          return [...prevTrackers];
        }
        return [...prevTrackers, trackerToAdd];
      } else {
        return [trackerToAdd];
      }
    case 'update':
      const hazRezSystem = action.hazRezSystem;
      const trackerToUpdate = action.tracker;
      if (prevTrackers.length > 0) {
        const trackerIndex = prevTrackers.findIndex((x) => x.hazRezSystem === hazRezSystem);
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
        return [...prevTrackers.slice(0, index), ...prevTrackers.slice(index + 1)];
      } else {
        return [];
      }
    case 'set':
      return action.trackers;
    default:
      throw new Error('No action exists for that tracker action.');
  }
};

export const MassacreContextProvider = (props: { children: ReactNode }) => {
  const [trackers, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (window) {
      const setTab = window.localStorage.getItem('massacreTrackerTab');
      if (setTab) {
        setSelectedTab(setTab);
      } else {
        setSelectedTab('+');
      }
    }
  }, []);

  useEffect(() => {
    if (window) {
      const store: IMassacreTrack[] | null = JSON.parse(
        window.localStorage.getItem('massacreTrackerStore')
      );
      if (store && store.length > 0) {
        dispatch({
          type: 'set',
          trackers: store.map((x) => {
            const tracker: IMassacreTrack = { hazRezSystem: x.hazRezSystem.toUpperCase(), ...x };
            return tracker;
          }),
        });
      } else {
        const defaultTrackers: IMassacreTrack[] = massacreDefaults;
        dispatch({
          type: 'set',
          trackers: defaultTrackers.map((x) => {
            const tracker: IMassacreTrack = { hazRezSystem: x.hazRezSystem.toUpperCase(), ...x };
            return tracker;
          }),
        });
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('massacreTrackerStore', JSON.stringify(trackers));
  }, [trackers]);

  const [selectedTab, setSelectedTab] = useState<string>(() => {
    if (trackers && trackers.length > 0) {
      const selectedTrack = trackers.find((x) => x.current === true);
      if (selectedTrack) {
        return selectedTrack.hazRezSystem;
      } else {
        return '+';
      }
    } else {
      return '+';
    }
  });

  useEffect(() => {
    window.localStorage.setItem('massacreTrackerTab', selectedTab);
  }, [selectedTab]);

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
    dispatch({ type: 'update', hazRezSystem, tracker: newTracker });
  };

  const deleteTracker = (tracker: IMassacreTrack) => {
    dispatch({ type: 'delete', tracker });
    if (trackers.length === 0) setSelectedTab('+');
    else setSelectedTab(trackers[0].hazRezSystem);
  };

  const wrapper: IMassacreContext = {
    trackers,
    addTracker,
    updateTracker,
    deleteTracker,
    selectedTab,
    setSelectedTab,
  };

  return <MassacreContext.Provider value={wrapper}>{props.children}</MassacreContext.Provider>;
};
