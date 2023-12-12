import React, { forwardRef, useContext } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import InfoIcon from "@mui/icons-material/Info";
import AllOutIcon from "@mui/icons-material/AllOut";
import CollectionsIcon from "@mui/icons-material/Collections";
import { LightTooltip } from "../../UI/styles.js";
import Dropdown from "react-bootstrap/Dropdown";
import HelpIcon from "@mui/icons-material/Help";
import FeaturedVideoOutlinedIcon from "@mui/icons-material/FeaturedVideoOutlined";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import { FilterContext } from "../../Context/FilterContext.js";

export const MenuButtons = ({
  hudOpen,
  setHudopen,
  infoContainerEnabled,
  setInfoContainerEnabled,
}) => {
  const filterContext = useContext(FilterContext);

  const infoToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {/* <MoreVertIcon color={"black"} fontSize={"small"} /> */}
      <InfoIcon className="adaPink" />

      {/* &#x25bc; */}
    </a>
  ));

  const algoToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {filterContext.filterState.algorithmType == "consecutive" ? (
        <Filter2Icon className="adaPink" />
      ) : (
        <Filter1Icon className="adaPink" />
      )}

      {/* &#x25bc; */}
    </a>
  ));

  const handleToggleHud = (uiElement) => {
    if (!hudOpen) {
      setHudopen(uiElement);
    } else {
      uiElement == hudOpen ? setHudopen(null) : setHudopen(uiElement);
    }
  };

  const handleAlgoType = (algorithmType) => {
    filterContext.filterDispatch({
      type: "changeAlgorithmType",
      payload: algorithmType,
    });
  };

  return (
    <>
      <div
        className="card position-absolute top-0 end-0 d-flex flex-wrap m-3 p-3 z-50"
        style={{ backgroundColor: "#ffffff", border: "1px black solid" }}
        id="menuButtonsContainer"
      >
        {infoContainerEnabled ? (
          <FeaturedVideoIcon
            onClick={() => setInfoContainerEnabled(!infoContainerEnabled)}
          />
        ) : (
          <LightTooltip placement="left" title="Enable Artwork Info Container">
            <FeaturedVideoOutlinedIcon
              onClick={() => setInfoContainerEnabled(!infoContainerEnabled)}
            />
          </LightTooltip>
        )}

        <LightTooltip placement="left" title="Filters">
          <FilterAltIcon onClick={() => handleToggleHud("filters")} />
        </LightTooltip>
        <LightTooltip placement="left" title="Collections">
          <CollectionsIcon onClick={() => handleToggleHud("collections")} />
        </LightTooltip>

        <hr></hr>

        {
          // filterContext.filterState.filterChains.length > 1 &&
          filterContext.filterState.filterChains[0].keywords.length ? (
            <>
              <LightTooltip placement="left" title="Filter Display Algorithm">
                <Dropdown>
                  <Dropdown.Toggle
                    as={algoToggle}
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu className="dropdownMenu">
                    <Dropdown.Item>
                      <LightTooltip
                        placement="left"
                        title="Default Keyword Matching"
                      >
                        <Filter1Icon onClick={() => handleAlgoType("")} />
                      </LightTooltip>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <LightTooltip placement="left" title="Consecutive">
                        <Filter2Icon
                          onClick={() => handleAlgoType("consecutive")}
                        />
                      </LightTooltip>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </LightTooltip>

              <hr></hr>
            </>
          ) : (
            <></>
          )
        }
        <Dropdown>
          <Dropdown.Toggle
            as={infoToggle}
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu className="dropdownMenu">
            <Dropdown.Item>
              <LightTooltip placement="left" title="About">
                <InfoIcon onClick={() => handleToggleHud("info")} />
              </LightTooltip>
            </Dropdown.Item>
            <Dropdown.Item>
              <LightTooltip placement="left" title="Help & How To">
                <HelpIcon onClick={() => handleToggleHud("help")} />
              </LightTooltip>
            </Dropdown.Item>
            <Dropdown.Item>
              <LightTooltip placement="left" title="Impressum">
                <AllOutIcon onClick={() => handleToggleHud("impressum")} />
              </LightTooltip>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};
