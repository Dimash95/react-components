import React from 'react';
import { Item } from '../entities/item';

interface ItemsContextType {
  searchedAnimeItems: Item[];
  setSearchedAnimeItems: (newItems: Item[]) => void;
}

export const initialItemsContext: ItemsContextType = {
  searchedAnimeItems: [],
  setSearchedAnimeItems: (newItems: Item[]) => {
    if (Array.isArray(newItems)) {
      localStorage.setItem('Searched anime', '');
      initialItemsContext.searchedAnimeItems = newItems;
    }
  },
};

export const Context = React.createContext(initialItemsContext);
