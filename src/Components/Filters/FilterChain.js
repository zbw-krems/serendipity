import React, { useState, useRef, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { LightTooltip } from "../../UI/styles.js";
import { replaceObjectByUID } from "../../utils/utils.js";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { KEYWORDSINFILTERCHAINSLIMIT } from "../../utils/config.js";
import { KeywordInFilterChain } from "./KeywordInFilterChain.js";
import { GraphContext } from "../../Context/GraphContext.js";

export const FilterChain = ({
  filterChain,
  filterContext,
  handleDeleteFilterCain,
  deleteKeywordFromFilterChain,
  moveKeywordToFilterChain,
  cloneKeywordToFilterChain,
  addAllRelatedKeywordsToFilterChain,
  handleCreateFilterChain,
  handleCreateUserCollection,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [muted, setMuted] = useState(false);
  const graphContext = useContext(GraphContext);

  const TextRef = useRef();

  const handleEditFilterChainTitle = (e, filterChain) => {
    e.preventDefault();
    if (filterChain.title != TextRef.current.value) {
      const state = filterContext.filterState.filterChains;
      filterChain.title = TextRef.current.value;

      filterContext.filterDispatch({
        type: "renameFilterChainTitle",
        payload: replaceObjectByUID(state, filterChain.uid, filterChain),
      });
    }
    setIsEditing(false);
  };

  const handleMute = () => {
    console.log(`Set Muted ${muted} ${filterChain.title}`);
    const state = filterContext.filterState.filterChains;

    setMuted(!muted);
    filterChain.muted = !muted;

    filterContext.filterDispatch({
      type: "renameFilterChainTitle",
      payload: replaceObjectByUID(state, filterChain.uid, filterChain),
    });
  };
  // console.log(graphContext.graphState);

  return (
    <div
      className="list-group-item "
      key={`FilterChain-Wrapper-${filterChain.uid}`}
      style={{ backgroundColor: filterChain.color }}
    >
      {filterChain.uid ? <div className="badge bg-black">OR</div> : <></>}
      <h5 className="text-white" key={`FilterChain-h5-${filterChain.uid}`}>
        {filterChain.uid != 0 ? (
          <LightTooltip title="Delete Filterchain">
            <DeleteIcon
              fontSize={"small"}
              onClick={() => handleDeleteFilterCain(filterChain.uid)}
            />
          </LightTooltip>
        ) : (
          <></>
        )}
        <EditIcon
          fontSize={"small"}
          sx={{ paddingX: "2px", marginX: "3px" }}
          onClick={() => setIsEditing(!isEditing)}
        />
        <LightTooltip title="Mute FilterChain">
          <FilterAltOffIcon
            fontSize={"smaller"}
            sx={{ paddingX: "2px", marginX: "3px" }}
            onClick={() => {
              handleMute();
            }}
          />
        </LightTooltip>
        {isEditing ? (
          <form
            className="renameForm d-flex align-items-end"
            onSubmit={(e) => {
              // console.log(e);
              return handleEditFilterChainTitle(e, filterChain);
            }}
          >
            <input
              type="text"
              ref={TextRef}
              value={filterChain.title}
              className="renameInput"
            />
            <button type="submit" className="renameSubmitButton">
              <CheckIcon fontSize="smaller" sx={{ paddingBottom: "5px" }} />
            </button>
          </form>
        ) : (
          filterChain.title + " "
        )}
        ({filterChain.keywords.length}/{KEYWORDSINFILTERCHAINSLIMIT})
      </h5>
      <p>
        <i className="text-white small">
          {graphContext.graphState.graphData.nodes.length + " "}
          Artworks
        </i>
      </p>

      {!filterChain.keywords.length && (
        <small className="text-muted">No Keywords in Filter yet</small>
      )}
      <div
        className="list-group text-right filtersItem filterChainScroll"
        key={`filterChainGroup-${filterChain.uid}`}
      >
        {filterChain.keywords.map((keyword) => {
          return (
            <KeywordInFilterChain
              key={`KeywordInFilterChainComponent-${filterChain.uid}-${keyword.uid}`}
              keyword={keyword}
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
            />
          );
        })}
      </div>
    </div>
  );
};
