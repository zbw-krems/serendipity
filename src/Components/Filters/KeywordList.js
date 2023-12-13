import React, { useState, useContext } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { LightTooltip } from "../../UI/styles";
import { FilterContext } from "../../Context/FilterContext";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ExpandIcon from "@mui/icons-material/Expand";
import DropdownComponent from "../../UI/DropdownComponent";
import { sortAlphabeticallyByTitle } from "../../utils/utils";
import { KeywordChildrenExpander } from "./KeywordChildrenExpander";
import { DataContext } from "../../Context/DataContext";
export const KeywordList = ({
  data,
  handleAddToFilterChain,
  handleCreateFilterChain,
}) => {
  const [sortAlphabetical, setSortAlphabetical] = useState(false);
  const filterContext = useContext(FilterContext);
  const dataContext = useContext(DataContext);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          overflowY: "scroll",
          height: 500,
          marginTop: "3rem",
        }}
        className="KeywordExpandableList img-thumbnail bg-white"
        // component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Thesaurus Dictionary
            <button
              className="small btn bg-white border-black mx-1 p-0"
              onClick={() => {
                setSortAlphabetical(!sortAlphabetical);
              }}
            >
              {sortAlphabetical ? (
                <LightTooltip title="Alphabetical Sorting">
                  <SortByAlphaIcon />
                </LightTooltip>
              ) : (
                <LightTooltip title="Topic Sorting">
                  <ExpandIcon />
                </LightTooltip>
              )}
            </button>
          </ListSubheader>
        }
      >
        {sortAlphabetical ? (
          <>
            {dataContext.dataState.alphabeticalKeywords.map(
              (keyword, index) => {
                return (
                  <LightTooltip
                    title="Alphabetical / Topic Sorting"
                    key={`TooltipAlphabetical-${keyword.uid}`}
                  >
                    <ListItem key={`alphabeticalItem-${keyword.uid}`}>
                      <ListItemButton key={`alphabeticalButton-${keyword.uid}`}>
                        <ListItemText
                          key={`alphabeticalText-${keyword.uid}`}
                          primaryTypographyProps={{
                            fontSize: "small",
                            paddingY: 0,
                          }}
                          primary={keyword.title}
                          // sx={{ padding: "0 !important" }}
                        />
                        <DropdownComponent
                          key={`DropdownComponent-${keyword.uid}-${keyword.title}`}
                          dropDownKey={`DropdownComponent-${keyword.uid}`}
                          dropdownItems={
                            filterContext.filterState.filterChains[0].keywords
                              .length &&
                            filterContext.filterState.filterChains.length > 0
                              ? [
                                  {
                                    title: "Add to Filterchain",
                                    command: null,
                                    subitems:
                                      filterContext.filterState.filterChains.map(
                                        (otherFilterChain) => {
                                          return {
                                            title: otherFilterChain.title,
                                            command: handleAddToFilterChain,
                                            parameters: [
                                              keyword,
                                              otherFilterChain,
                                            ],
                                          };
                                        }
                                      ),
                                  },
                                  {
                                    title: "Create new Filterchain",
                                    command: handleCreateFilterChain,
                                    parameters: [[keyword]],
                                  },
                                ]
                              : [
                                  {
                                    title: "Add to Filterchain",
                                    command: null,
                                    subitems:
                                      filterContext.filterState.filterChains.map(
                                        (otherFilterChain) => {
                                          return {
                                            title: otherFilterChain.title,
                                            command: handleAddToFilterChain,
                                            parameters: [
                                              keyword,
                                              otherFilterChain,
                                            ],
                                          };
                                        }
                                      ),
                                  },
                                ]
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </LightTooltip>
                );
              }
            )}
          </>
        ) : (
          <>
            {data.children.length &&
              sortAlphabeticallyByTitle(data.children).map((child) => (
                <KeywordChildrenExpander
                  parentKeyword={child}
                  key={`KeywordChildrenExpanderComponent-${child.uid}`}
                  filterContext={filterContext}
                  handleAddToFilterChain={handleAddToFilterChain}
                  handleCreateFilterChain={handleCreateFilterChain}
                />
              ))}
          </>
        )}
      </List>
    </div>
  );
};

export default KeywordList;
