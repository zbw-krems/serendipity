import React, { useMemo, useReducer } from "react";

const defaultGraph = {
  graphData: {
    nodes: [],
    links: [],
  },
  isReady: false,
  graphMode: false,
  separateGraphData: {},
};

export const GraphContext = React.createContext(defaultGraph);

const reduceGraphContext = (state, action) => {
  switch (action.type) {
    case "initGraph":
      //console.log(action.payload.graphData);
      return {
        ...state,
        graphData: action.payload.graphData,
        separateGraphData: action.payload.separateGraphData,
        isReady: true,
      };

    case "updateGraph":
      return {
        ...state,
        graphData: action.payload.graphData,
        separateGraphData: action.payload.separateGraphData,
      };

    case "updateGraphMode":
      return {
        ...state,
        graphMode: action.payload,
      };
  }
};

export default function GraphState({ children }) {
  const [graphState, graphDispatch] = useReducer(
    reduceGraphContext,
    defaultGraph
  );
  const graphValue = useMemo(
    () => ({ graphState, graphDispatch }),
    [graphState]
  );

  return (
    <GraphContext.Provider value={graphValue}>{children}</GraphContext.Provider>
  );
}
