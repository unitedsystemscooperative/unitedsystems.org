import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { IMassacreContext } from 'models/massacreContext';
import { IMassacreTrack } from 'models/massacreTrack';
import { createContext, ReactNode, useEffect, useState } from 'react';
import massacreDefaults from 'data/information/massacre/massacreDefaults.json';

export const MassacreContext = createContext<IMassacreContext | null>(null);

export const MassacreContextProvider = (props: { children: ReactNode }) => {
  const [store] = useLocalStorage<IMassacreTrack[] | null>(
    'massacreTrackerStore',
    null
  );

  const [trackers, setTrackers] = useState<IMassacreTrack[]>(() => {
    if (store && Array.isArray(store) && store.length > 0) {
      const trackers: IMassacreTrack[] = store;
      return trackers;
    } else {
      const defaultTrackers: IMassacreTrack[] = massacreDefaults;
      return defaultTrackers;
    }
  });

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
    writeStorage('massacreTrackerStore', trackers);
    console.log('wrote to storage');
  }, [trackers]);

  const addTracker = (newTracker: IMassacreTrack) => {
    let response = '';
    setTrackers((prevTrackers) => {
      if (prevTrackers) {
        const foundTracker = prevTrackers.find(
          (x) =>
            x.hazRezSystem.toLowerCase() ===
            newTracker.hazRezSystem.toLowerCase()
        );
        if (foundTracker) {
          response = `Tracker for ${newTracker.hazRezSystem} already exists.`;
          return [...prevTrackers];
        }
        return [...prevTrackers, newTracker];
      } else {
        return [newTracker];
      }
    });
    return response;
  };

  const updateTracker = (hazRezSystem: string, newTracker: IMassacreTrack) => {
    console.log('Update Tracker');
    setTrackers((prevTrackers) => {
      if (prevTrackers.length > 0) {
        const trackerIndex = prevTrackers.findIndex(
          (x) => x.hazRezSystem === hazRezSystem
        );
        if (trackerIndex === -1) {
          return [...prevTrackers, newTracker];
        }
        const newTrackers = [
          ...prevTrackers.slice(0, trackerIndex),
          newTracker,
          ...prevTrackers.slice(trackerIndex + 1),
        ];
        return newTrackers;
      } else {
        return [newTracker];
      }
    });
  };

  const deleteTracker = (tracker: IMassacreTrack) => {
    setTrackers((prevTrackers) => {
      if (prevTrackers) {
        const index = prevTrackers.indexOf(tracker);
        return [
          ...prevTrackers.slice(0, index),
          ...prevTrackers.slice(index + 1),
        ];
      }
      return [];
    });
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
