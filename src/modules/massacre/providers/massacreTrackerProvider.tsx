import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react';
import massacreDefaults from '~/massacre/data/massacreDefaults.json';
import { IMassacreTrack } from '~/massacre/massacreTrack';
import { processHazRezSystem } from '../processHazRezSystem';

export interface IMassacreContext {
  trackers: IMassacreTrack[];
  addTracker: (system: string) => Promise<string | IMassacreTrack>;
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
      return prevTrackers.length !== 0 ? [...prevTrackers, trackerToAdd] : [trackerToAdd];
    case 'update':
      const hazRezSystem = action.hazRezSystem;
      const trackerToUpdate = action.tracker;
      if (prevTrackers.length > 1) {
        const trackerIndex = prevTrackers.findIndex(
          (x) => x.hazRezSystem.toUpperCase() === hazRezSystem.toUpperCase()
        );
        return [
          ...prevTrackers.slice(0, trackerIndex),
          trackerToUpdate,
          ...prevTrackers.slice(trackerIndex + 1),
        ];
      } else {
        return [trackerToUpdate];
      }
    case 'delete':
      const trackerToDelete = action.tracker;
      if (prevTrackers.length > 1) {
        const index = prevTrackers.indexOf(trackerToDelete);
        return [...prevTrackers.slice(0, index), ...prevTrackers.slice(index + 1)];
      } else {
        return [];
      }
    case 'set':
      return action.trackers;
    /* istanbul ignore next */
    default:
      throw new Error('No action exists for that tracker action.');
  }
};

export const MassacreContextProvider = (props: { children: ReactNode }) => {
  const [trackers, dispatch] = useReducer<Reducer<IMassacreTrack[], trackerAction>>(reducer, []);
  const [selectedTab, setSelectedTab] = useState<string>('+');

  useEffect(() => {
    const setTab = localStorage.getItem('massacreTrackerTab');
    if (setTab) {
      setSelectedTab(setTab);
    } else {
      setSelectedTab('+');
    }
  }, []);

  useEffect(() => {
    const store: IMassacreTrack[] | null = JSON.parse(localStorage.getItem('massacreTrackerStore'));
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
  }, []);

  useEffect(() => {
    localStorage.setItem('massacreTrackerStore', JSON.stringify(trackers));
  }, [trackers]);

  useEffect(() => {
    localStorage.setItem('massacreTrackerTab', selectedTab);
  }, [selectedTab]);

  const addTracker = async (system: string): Promise<string | IMassacreTrack> => {
    let response = '';
    try {
      const newTracker = await processHazRezSystem(system);
      dispatch({ type: 'add', tracker: newTracker });
      return newTracker;
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
    setSelectedTab('+');
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
