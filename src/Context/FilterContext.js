import React, { useMemo, useReducer } from "react";

const defaultChain = {
  algorithmType: "",
  artworkResult: {},
  filterChains: [
    {
      uid: 0,
      title: "Filter Chain 1",
      color: "#F08080",
      keywords: [],
      muted: false,
    },
  ],
};

export const FilterContext = React.createContext(defaultChain);

const reduceFilterContext = (state, action) => {
  switch (action.type) {
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
        filterChains: action.payload,
      };
    case "removeFilterChain":
      return {
        ...state,
        filterChains: action.payload,
      };
    case "changeAlgorithmType":
      return {
        ...state,
        algorithmType: action.payload,
      };

    case "updateArtworkResult":
      return {
        ...state,
        artworkResult: action.payload,
      };

    case "renameFilterChainTitle":
      const renameFilterChainTitle = (index, newValue, state) => {};
      return {
        ...state,
        //filterChain: renameFilterChainTitle(action.payload.index, action.payload.newTitle, state),
      };
  }
};

export default function FilterState({ children }) {
  const [filterState, filterDispatch] = useReducer(
    reduceFilterContext,
    defaultChain
  );
  const filterValue = useMemo(
    () => ({ filterState, filterDispatch }),
    [filterState]
  );

  return (
    <FilterContext.Provider value={filterValue}>
      {children}
    </FilterContext.Provider>
  );
}
