import React, {useState} from 'react';
import {createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IEntry} from '../../services/interfaces';

interface ContextState {
  favoriteEntries: IEntry[];
  setFavoriteEntries: (entries: IEntry[]) => void;
}
export const Context = createContext({} as ContextState);

export const ContextProvider = ({children}) => {
  const [favoriteEntries, setFavoriteEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('favoriteEntries').then(res => {
      if (res) {
        setFavoriteEntries(JSON.parse(res));
        console.log('favorites fetched', JSON.parse(res));
      }
    });
  }, []);

  useEffect(() => {
    console.log('favorites updated', favoriteEntries);
  }, [favoriteEntries]);

  return (
    <Context.Provider
      value={{
        favoriteEntries,
        setFavoriteEntries,
      }}>
      {children}
    </Context.Provider>
  );
};
