import React, { useContext, useState, useEffect } from "react";
import { FilterContext } from "../../Context/FilterContext";
import { DataContext } from "../../Context/DataContext";

import FilterChains from "./FilterChains";
import SunburstRendering from "./Sunburst";
import { MaterialUISwitch } from "../../UI/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  replaceObjectByUID,
  findRecursiveObjectByUid,
  removeObjectByUID,
  getRandomColor,
} from "../../utils/utils";
import {
  FILTERCHAINSLIMIT,
  KEYWORDSINFILTERCHAINSLIMIT,
} from "../../utils/config";
import KeywordList from "./KeywordList";

const Filters = ({ handleCreateUserCollection }) => {
  const filterContext = useContext(FilterContext);
  const dataContext = useContext(DataContext);
  // const [keywordView, setKeywordView] = useState("sunburst");
  const [isSunburst, setIsSunburst] = useState(false);

  const toggle = () => {
    setIsSunburst(!isSunburst);
  };

  const handleAddToFilterChain = (keyword, filterChain) => {
    // console.log(keyword, filterChain);
    const state = filterContext.filterState.filterChains;
    if (filterChain.keywords.length < KEYWORDSINFILTERCHAINSLIMIT) {
      if (!filterChain.keywords.some((arrVal) => keyword.uid === arrVal.uid)) {
        filterChain.keywords.push(keyword);
        filterContext.filterDispatch({
          type: "addKeywordToFilterChain",
          payload: replaceObjectByUID(state, filterChain.uid, filterChain),
        });
      } else {
        console.warn("Already in Chain");
        return;
      }
    }
  };

  const handleCreateFilterChain = (keywords = null) => {
    // console.log(keywords);
    const state = filterContext.filterState.filterChains;

    if (state.length < FILTERCHAINSLIMIT) {
      let newFilterChain = {
        uid: state[state.length - 1].uid + 1,
        title: "New Filter Chain " + (state.length + 1).toString(),
        keywords: keywords ? [...keywords] : [],
        color: getRandomColor(state[state.length - 1].uid + 1),
        muted: false,
      };
      state.push(newFilterChain);
      filterContext.filterDispatch({
        type: "addFilterChain",
        payload: state,
      });

      return newFilterChain;
    }
  };

  const handleDeleteFilterCain = (filterUid) => {
    if (filterUid != 0) {
      let state = filterContext.filterState.filterChains;

      state = removeObjectByUID(state, filterUid);

      filterContext.filterDispatch({
        type: "removeFilterChain",
        payload: state,
      });
    }
  };

  const deleteKeywordFromFilterChain = (keyword, filterChain) => {
    // console.log(filterChain);
    const state = filterContext.filterState.filterChains;
    const filterChainToRemoveKeywordFrom = state.find(
      (obj) => obj.uid === filterChain.uid
    );
    //   console.log("HERE", filterChainToRemoveKeywordFrom);
    removeObjectByUID(filterChainToRemoveKeywordFrom.keywords, keyword.uid);
    replaceObjectByUID(state, filterChain.uid, filterChainToRemoveKeywordFrom);

    filterContext.filterDispatch({
      type: "removeKeywordFromFilterChain",
      payload: state,
    });
  };

  const addAllRelatedKeywordsToFilterChain = (filterChain, keyword) => {
    // console.log(keyword);
    // console.log(filterContext.filterState.allArtworks);
    const state = filterContext.filterState.filterChains;
    keyword.related.map(
      (uid) =>
        findRecursiveObjectByUid(uid.uid, dataContext.dataState.allKeywords) &&
        filterChain.keywords.push(
          findRecursiveObjectByUid(uid.uid, dataContext.dataState.allKeywords)
        )
    );
    replaceObjectByUID(state, filterChain.uid, filterChain);

    filterContext.filterDispatch({
      type: "removeKeywordFromFilterChain",
      payload: state,
    });
  };

  const moveKeywordToFilterChain = (
    keyword,
    oldFilterChain,
    newFilterChain
  ) => {
    const state = filterContext.filterState.userCollections;
    removeObjectByUID(oldFilterChain.keywords, keyword.uid);
    replaceObjectByUID(state, oldFilterChain.uid, oldFilterChain);
    state
      .find((filterChain) => filterChain.uid === newFilterChain.uid)
      .keywords.push(keyword);

    filterContext.filterDispatch({
      type: "addKeywordToFilterChain",
      payload: state,
    });
  };

  const cloneKeywordToFilterChain = (keyword, newFilterChain) => {
    const state = filterContext.filterState.filterChains;

    state
      .find((filterChain) => filterChain.uid === newFilterChain.uid)
      .keywords.push(keyword);

    filterContext.filterDispatch({
      type: "addKeywordToFilterChain",
      payload: state,
    });
  };

  useEffect(() => {
    console.log("Filter:", filterContext.filterState);
  }, [filterContext.filterState]);

  return (
    <div className="z-50">
      <div className="position-absolute w-100 h-100 justify-content-start d-flex flex-wrap flex-column">
        <FormGroup className="m-3 z-inherit" style={{ height: "50px" }}>
          <div className="d-flex align-items-center justify-content-center flex-wrap text-align-center">
            <small>List View</small>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} onChange={toggle} />}
              // label="Keywords View"
            />
            <small>Sunburst</small>
          </div>
        </FormGroup>
        {dataContext.dataState.allKeywords != [] ? (
          isSunburst ? (
            <>
              <SunburstRendering
                data={dataContext.dataState.allKeywords}
                handleAddToFilterChain={handleAddToFilterChain}
                handleCreateFilterChain={handleCreateFilterChain}
              />
              <small className="sunburst-helptext text-muted my-5">
                Use right click for Context Menu on Sunburst.
              </small>
            </>
          ) : (
            <KeywordList
              data={dataContext.dataState.allKeywords}
              handleAddToFilterChain={handleAddToFilterChain}
              handleCreateFilterChain={handleCreateFilterChain}
            />
          )
        ) : (
          <></>
        )}
      </div>

      <FilterChains
        handleCreateFilterChain={handleCreateFilterChain}
        handleDeleteFilterCain={handleDeleteFilterCain}
        deleteKeywordFromFilterChain={deleteKeywordFromFilterChain}
        addAllRelatedKeywordsToFilterChain={addAllRelatedKeywordsToFilterChain}
        moveKeywordToFilterChain={moveKeywordToFilterChain}
        cloneKeywordToFilterChain={cloneKeywordToFilterChain}
        handleCreateUserCollection={handleCreateUserCollection}
      />
    </div>
  );
};

export default Filters;
