import React, { useMemo, useReducer } from "react";
import { getRandomColor } from "../utils/utils";

const defaultData = {
  allArtworks: null,
  allKeywords: null,
  alphabeticalKeywords: null,
  filterChains: [
    {
      uid: 0,
      title: "Filter Chain 1",
      color: getRandomColor(),
      keywords: [],
      muted: false,
    },
  ],
  dataReady: false,
  userCollections: [],
};

export const DataContext = React.createContext(defaultData);

const reduceDataContext = (state, action) => {
  switch (action.type) {
    case "initData":
      return {
        ...state,
        allArtworks: action.payload.artworkData,
        allKeywords: action.payload.recursiveKeywordsData,
        alphabeticalKeywords: action.payload.alphabeticalKeywordsData,
        dataReady: action.payload.dataReady,
        userCollections: action.payload.collectionData,
      };

    case "addArtworkToUserCollections":
      return {
        ...state,
        userCollections: action.payload,
      };

    case "addUserCollection":
      return {
        ...state,
        userCollections: action.payload,
      };

    case "removeUserCollection":
      return {
        ...state,
        userCollections: action.payload,
      };

    case "removeArtworkFromUserCollections":
      return {
        ...state,
        userCollections: action.payload,
      };


    case "removeArtworkFromUserCollections":
      return {
        ...state,
        sunburstData: action.payload,
      };

    case "modifyArtworkInCollection":
      return {
        ...state,
        userCollections: action.payload,
      };


      return {
        ...state,
        filterChains: action.payload,
      };

    case "renameCollectionTitle":
      return {
        ...state,
        userCollections: action.payload,
      };
    
    
    case "addKeywordToFilterChain":
        return {
          ...state,
          filterChains: action.payload,
        };
  
    case "removeKeywordFromFilterChain":
        return {
          ...state,
          filterChains: action.payload,
        };
  
    case "addFilterChain":
      return {
        ...state,
        sunburstData: action.payload,
      };
    case "removeFilterChain":

      return {
        ...state,
        sunburstData: action.payload,
      };
    case "modifyKeywordInFilterChain":
    case "renameFilterChainTitle":
      return {
        ...state,
        userCollections: action.payload,
      };
  }

};

// ! This Datacontext was possible due to multiple extraordinary and selfless acts
// ! of guidance and brotherhood. This message is to honour Jan Victor Schuster,
// ! who is a gentleman and a warrior.

export default function DataState({ children }) {
  const [dataState, dataDispatch] = useReducer(reduceDataContext, defaultData);
  const dataValue = useMemo(() => ({ dataState, dataDispatch }), [dataState]);

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}
