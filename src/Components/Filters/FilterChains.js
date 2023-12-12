import React, { useContext, useState, useRef } from "react";
import { FilterContext } from "../../Context/FilterContext.js";
import { LightTooltip } from "../../UI/styles.js";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FILTERCHAINSLIMIT } from "../../utils/config.js";
import { FilterChain } from "./FilterChain.js";

const FilterChains = ({
  handleCreateFilterChain,
  handleDeleteFilterCain,
  deleteKeywordFromFilterChain,
  addAllRelatedKeywordsToFilterChain,
  moveKeywordToFilterChain,
  cloneKeywordToFilterChain,
  handleCreateUserCollection,
}) => {
  const filterContext = useContext(FilterContext);

  //console.log("Keyword Filters Rendering");
  //console.log('FilterChains:', FilterContext.filterState)
  return (
    <div className="position-absolute m-3 end-0 z-50 filterChains">
      <h4>
        Filter Chains ({filterContext.filterState.filterChains.length}/
        {FILTERCHAINSLIMIT})
      </h4>
      <div className="list-group filterChainsScroll">
        {filterContext.filterState.filterChains.map((filterChain, index) => (
          <FilterChain
            key={`FilterChainComponent-${filterChain.uid}`}
            filterChain={filterChain}
            filterContext={filterContext}
            deleteKeywordFromFilterChain={deleteKeywordFromFilterChain}
            moveKeywordToFilterChain={moveKeywordToFilterChain}
            cloneKeywordToFilterChain={cloneKeywordToFilterChain}
            addAllRelatedKeywordsToFilterChain={
              addAllRelatedKeywordsToFilterChain
            }
            handleCreateFilterChain={handleCreateFilterChain}
            handleCreateUserCollection={handleCreateUserCollection}
            handleDeleteFilterCain={handleDeleteFilterCain}
          />
        ))}
      </div>
      {filterContext.filterState.filterChains.length > 0 &&
      filterContext.filterState.filterChains[0].keywords.length > 0 ? (
        <LightTooltip title="Add New FilterChain">
          <AddCircleOutlineIcon onClick={() => handleCreateFilterChain()} />
        </LightTooltip>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FilterChains;
