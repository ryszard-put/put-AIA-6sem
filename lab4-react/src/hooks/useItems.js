import { useReducer, useState } from 'react';
import { items } from '../json/items.json';

export const TYPES = {
  CHANGE_NAME: 'change_name',
  CHANGE_DESCRIPTION: 'chang_description',
  CHANGE_IMAGE: 'change_image',
  CHANGE_RATING: 'change_rating',
  ADD_ITEM: 'add_item',
  DELETE_ITEM: 'delete_item',
};

const itemsReducer = (state, action) => {
  switch (action.type) {
    case TYPES.CHANGE_NAME: {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, name: action.payload.value }
          : item
      );
    }
    case TYPES.CHANGE_DESCRIPTION: {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, description: action.payload.value }
          : item
      );
    }
    case TYPES.CHANGE_IMAGE: {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, image: action.payload.value }
          : item
      );
    }
    case TYPES.CHANGE_RATING: {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, rating: action.payload.value }
          : item
      );
    }
    case TYPES.ADD_ITEM: {
      return [
        ...state,
        {
          id: state.length === 0 ? 1 : state[state.length - 1].id + 1,
          name: '',
          description: '',
          url: '',
          rating: 2,
        },
      ];
    }
    case TYPES.DELETE_ITEM: {
      return state.filter((item) => item.id !== action.payload.id);
    }
    default:
      return state;
  }
};

export const useItems = () => {
  const [state, dispatch] = useReducer(itemsReducer, items);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('id-asc'); // possible options: [field_name]-[asc|desc]

  const changeSortingColumn = (field) => {
    setSortBy((prev) => {
      const [oldField, oldOrder] = prev.split('-');
      if (oldField === field) {
        return `${field}-${oldOrder === 'asc' ? 'desc' : 'asc'}`;
      }
      return `${field}-asc`;
    });
  };

  const changeFactory = (type) => (id, value) =>
    dispatch({ type, payload: { id, value } });

  const addItem = () => dispatch({ type: TYPES.ADD_ITEM });

  const deleteItem = (id) =>
    dispatch({ type: TYPES.DELETE_ITEM, payload: { id } });

  const handlers = {
    changeName: changeFactory(TYPES.CHANGE_NAME),
    changeDescription: changeFactory(TYPES.CHANGE_DESCRIPTION),
    changeRating: changeFactory(TYPES.CHANGE_RATING),
    changeImage: changeFactory(TYPES.CHANGE_IMAGE),
    deleteItem,
  };

  return {
    items: state,
    addItem,
    handlers,
    searchValue,
    setSearchValue,
    sortBy,
    changeSortingColumn,
  };
};
