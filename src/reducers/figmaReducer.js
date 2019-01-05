import {
  GET_FIGMA_NODES,
  GET_FIGMA_IMAGES,
} from '../actions/types';

const initialState = {
  items: [],
  images: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FIGMA_NODES:
      return {
        ...state,
        items: action.payload,
      };
    case GET_FIGMA_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    default:
      return state;
  }
}
