import axios from 'axios';
import {
  GET_FIGMA_NODES,
  GET_FIGMA_IMAGES,
} from './types';

export const getFigmaNodes = figmaFileKey => (dispatch) => {
  axios({
    method: 'get',
    timeout: 7000,
    headers: {
      'X-Figma-Token': process.env.REACT_APP_FIGMAKEY,
    },
    url: `https://api.figma.com/v1/files/${figmaFileKey}`,
  })
    .then(response => response.data)
    .then((root) => {
      const { children: pages } = root.document;
      const { components } = root;
      return pages
        .filter(page => page.name.indexOf('***') < 0) // Skip pages aren't ready to be published
        .map(page => (
          page.children // Frames
            .filter(frame => frame.name.indexOf('***') < 0) // Skip frames aren't ready to be published
            .map(frame => (
              frame.children // Nodes
                .filter(node => node.name.indexOf('***') < 0 && node.type === 'COMPONENT') // Skip nodes aren't ready to be published and instances
                // Reconstruct object by adding page (category) and frame (group) name
                .map(node => ({
                  id: node.id,
                  name: node.name,
                  category: page.name,
                  group: frame.name,
                  node,
                }))
            ))
            .reduce((prev, curr) => prev.concat(curr)) // Flatten frame level array
        ))
        .reduce((prev, curr) => prev.concat(curr)) // Flatten page level array
        .map((node) => {
          if (components[node.id]) {
            const rawDescription = components[node.id].description;
            const matchKeywords = /(?:%KEYWORDS%)(.[^|]*)/g.exec(rawDescription) || rawDescription;
            const matchDescription = /(?:%DESCRIPTION%)(.[^|]*)/g.exec(rawDescription) || rawDescription;
            const keywords = matchKeywords[1].trim();
            const description = matchDescription[1].trim();
            return ({
              ...node,
              keywords,
              description,
            });
          }
          return node;
        });
    })
    .then(data => (dispatch({
      type: GET_FIGMA_NODES,
      payload: data,
    })));
};

export const getFigmaImages = (figmaFileKey, ids) => (dispatch) => {
  const url = `https://api.figma.com/v1/images/${figmaFileKey}?ids=${ids}&format=svg`;
  axios({
    method: 'get',
    timeout: 7000,
    headers: {
      'X-Figma-Token': process.env.REACT_APP_FIGMAKEY,
    },
    url,
  })
    .then((response) => {
      const images = response.data;
      dispatch({
        type: GET_FIGMA_IMAGES,
        payload: images,
      });
    });
};
