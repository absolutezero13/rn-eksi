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
    AsyncStorage.getItem('favorites')
      .then(res => {
        console.log('favs res', JSON.parse(res));

        if (res) {
          const parsedArr = JSON.parse(res);

          if (typeof parsedArr === 'string') {
            setFavoriteEntries([]);
          } else {
            const parsedArr2 = JSON.parse(res);
            setFavoriteEntries(parsedArr2);
          }

          console.log('favorites fetched', typeof parsedArr);
        }
      })
      .catch(err => {
        console.log('favs err', err);
      });
  }, []);

  useEffect(() => {
    console.log(
      'favorites updated',
      favoriteEntries,
      typeof favoriteEntries,
      favoriteEntries.length,
    );
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
