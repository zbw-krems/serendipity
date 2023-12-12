import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DropdownComponent from "../../UI/DropdownComponent";

export const KeywordChildrenExpander = ({
  parentKeyword,
  filterContext,
  handleCreateFilterChain,
  handleAddToFilterChain,
}) => {
  // console.log("Child", parentKeyword);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div key={`keywordListWrapper-${parentKeyword.title}`}>
      <List
        aria-labelledby="nested-list"
        className="KeywordExpandableList"
        key={`keywordList-${parentKeyword.title}`}
      >
        <ListItem key={`lb-${parentKeyword.uid}`} divider>
          <ListItemButton>
            {parentKeyword && (
              <div
                key={`KeywordListItemWrapper-${parentKeyword.uid}`}
                className="d-flex flex-wrap"
              >
                <ListItemText
                  key={`lt-${parentKeyword.uid}`}
                  primaryTypographyProps={{
                    fontSize: "small",
                    paddingLeft: parentKeyword.level.toString() + "rem",
                    paddingY: 0,
                  }}
                  primary={parentKeyword.title}
                  // sx={{ padding: "0 !important" }}
                />

                <DropdownComponent
                  key={`DropdownComponent-${parentKeyword.uid}-${parentKeyword.title}`}
                  dropDownKey={`DropdownComponent-${parentKeyword.uid}`}
                  dropdownItems={
                    filterContext.filterState.filterChains[0].keywords.length &&
                    filterContext.filterState.filterChains.length > 0
                      ? [
                          {
                            title: "Create new Filterchain",
                            command: handleCreateFilterChain,
                            parameters: [[parentKeyword]],
                          },
                          {
                            title: "Add to Filterchain",
                            command: null,
                            subitems: filterContext.filterState.filterChains.map(
                              (otherFilterChain) => {
                                return {
                                  title: otherFilterChain.title,
                                  command: handleAddToFilterChain,
                                  parameters: [parentKeyword, otherFilterChain],
                                };
                              }
                            ),
                          },
                        ]
                      : [
                          {
                            title: "Add to Filterchain",
                            command: null,
                            subitems: filterContext.filterState.filterChains.map(
                              (otherFilterChain) => {
                                return {
                                  title: otherFilterChain.title,
                                  command: handleAddToFilterChain,
                                  parameters: [parentKeyword, otherFilterChain],
                                };
                              }
                            ),
                          },
                        ]
                  }
                />
              </div>
            )}
            {parentKeyword.children.length ? (
              open ? (
                <ExpandLess onClick={handleClick} />
              ) : (
                <ExpandMore onClick={handleClick} />
              )
            ) : (
              <></>
            )}
          </ListItemButton>
        </ListItem>
        {parentKeyword && (
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            key={`collapse-${parentKeyword.uid}`}
          >
            <List
              component="div"
              disablePadding
              aria-labelledby="nested-list"
              key={`collapsableList-${parentKeyword.uid}`}
            >
              {parentKeyword.children.map((child, index) => (
                <KeywordChildrenExpander
                  filterContext={filterContext}
                  handleCreateFilterChain={handleCreateFilterChain}
                  handleAddToFilterChain={handleAddToFilterChain}
                  parentKeyword={child}
                  key={`KeywordChildrenExpanderComponent-${index}-${child.uid}`}
                />
              ))}
            </List>
          </Collapse>
        )}
      </List>
    </div>
  );
};
