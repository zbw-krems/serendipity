import React, { useContext } from "react";
import { DataContext } from "../Context/DataContext";

const FlyingFilters = () => {
  const dataContext = useContext(DataContext);

  return (
    <div id="flyingFilters">
      {dataContext.dataState.filterChains.length > 1 ||
      dataContext.dataState.filterChains[0].keywords.length ? (
        dataContext.dataState.filterChains.map((filterChain) => {
          return (
            <ul
              style={{ color: filterChain.color }}
              key={`flyingFilterChain-${filterChain.uid}`}
            >
              {filterChain.keywords.map((keyword) => (
                <li key={`flyingFilterKeyword-${keyword.uid}`}>
                  {keyword.title}
                </li>
              ))}
            </ul>
          );
        })
      ) : (
        <>No Filters</>
      )}
    </div>
  );
};

export default FlyingFilters;
