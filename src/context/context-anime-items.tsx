import React from 'react';
import { Item } from '../entities/item';

interface ItemsContextType {
  searchedInputValue: string;
  setSearchedInputValue: (newInputValue: string) => void;
  searchedAnimeItems: Item[];
  setSearchedAnimeItems: (newItems: Item[]) => void;
}

export const initialItemsContext: ItemsContextType = {
  searchedInputValue: '',
  setSearchedInputValue: (newInputValue: string) => {
    if (typeof newInputValue === 'string' && newInputValue.length > 0) {
      localStorage.setItem('Searched anime', newInputValue);
      initialItemsContext.searchedInputValue = newInputValue;
    }
  },
  searchedAnimeItems: [],
  setSearchedAnimeItems: (newItems: Item[]) => {
    if (Array.isArray(newItems)) {
      localStorage.setItem('Searched anime', '');
      initialItemsContext.searchedAnimeItems = newItems;
    }
  },
};

export const Context = React.createContext(initialItemsContext);
