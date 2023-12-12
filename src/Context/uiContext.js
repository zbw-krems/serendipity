import React, { useMemo, useReducer } from "react";

const defaultUI = {
  artworkInfoposition: { x: 0, y: 0 },
};

export const UIContext = React.createContext(defaultUI);

const reduceUIContext = (state, action) => {
  switch (action.type) {
    case "initUI":
      return {
        ...state,
        artworkInfoposition: action.payload.artworkInfopositionUI,
      };

    case "updateArtworkInfoPosition":
      return {
        ...state,
        artworkInfoposition: action.payload,
      };
  }
};

export default function UIState({ children }) {
  const [dataState, dataDispatch] = useReducer(reduceUIContext, defaultUI);
  const dataValue = useMemo(() => ({ dataState, dataDispatch }), [dataState]);

  return <UIContext.Provider value={dataValue}>{children}</UIContext.Provider>;
}
