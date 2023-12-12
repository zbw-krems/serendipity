import React, { useContext } from "react";

import {
  replaceObjectByUID,
  returnObjectsFromUids,
  filterObjectsByKeywords,
} from "../../utils/utils.js";
import DropdownComponent from "../../UI/DropdownComponent.js";
import { DataContext } from "../../Context/DataContext.js";
export const KeywordInFilterChain = ({
  keyword,
  filterChain,
  deleteKeywordFromFilterChain,
  filterContext,
  moveKeywordToFilterChain,
  cloneKeywordToFilterChain,
  addAllRelatedKeywordsToFilterChain,
  handleCreateFilterChain,
  handleCreateUserCollection,
}) => {
  // console.log("CHAIN", filterChain);
  const dataContext = useContext(DataContext);
  return (
    <div
      className="list-group-item flex-wrap d-flex small align-items-start"
      key={"c" + keyword.uid}
    >
      <div className="badge bg-black">AND</div>
      <span className="truncate">{keyword.title}</span>

      <DropdownComponent
        dropdownItems={[
          {
            title: "Delete from FilterChain",
            command: deleteKeywordFromFilterChain,
            parameters: [keyword, filterChain],
          },
          {
            title: "Move to FilterChain...",
            command: null,
            subitems: filterContext.filterState.filterChains.map(
              (otherFilterChain) => {
                return {
                  title: otherFilterChain.title,
                  command: moveKeywordToFilterChain,
                  parameters: [keyword, filterChain, otherFilterChain],
                };
              }
            ),
          },
          {
            title: "Clone to FilterChain...",
            command: null,
            subitems: filterContext.filterState.filterChains.map(
              (otherFilterChain) => {
                return {
                  title: otherFilterChain.title,
                  command: cloneKeywordToFilterChain,
                  parameters: [keyword, filterChain, otherFilterChain],
                };
              }
            ),
          },
          // { title: null },
          // {
          //   title: "Add all related Keywords to this Chain",
          //   command: addAllRelatedKeywordsToFilterChain,
          //   parameters: [filterChain, keyword],
          // },
          // {
          //   title: "Create new Chain with related Keyords",
          //   command: handleCreateFilterChain,
          //   parameters: [
          //     returnObjectsFromUids(
          //       dataContext.dataState.alphabeticalKeywords,
          //       keyword.related.map((rel) => rel.uid)
          //     ),
          //   ],
          // },
          { title: null },
          {
            title: "Create new Collection with matching artworks",
            command: handleCreateUserCollection,
            parameters: [
              filterObjectsByKeywords(
                dataContext.dataState.allArtworks,
                filterChain
              ).map((artwork) => artwork.uid),
              filterChain.title,
            ],
          },
        ]}
      />
    </div>
  );
};
