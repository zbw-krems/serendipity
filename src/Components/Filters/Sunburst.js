import Sunburst from "sunburst-chart";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Context/DataContext";
import { FilterContext } from "../../Context/FilterContext";
import { ContextMenu } from "../../UI/styles";

const SunburstRendering = ({
  data,
  handleAddToFilterChain,
  handleCreateFilterChain,
}) => {
  // const statusContext = useContext(StatusContext);
  const [clicked, setClicked] = useState(false);
  const [sunburstData, setSunburstData] = useState(data);
  const [focusedKeyword, setFocusedKeyword] = useState(null);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleRightClick = () => setClicked(false);
    window.addEventListener("click", handleRightClick);
    return () => {
      window.removeEventListener("click", handleRightClick);
    };
  }, []);
  const dataContext = useContext(DataContext);
  const filterContext = useContext(FilterContext);

  const Chart = Sunburst();

  // useEffect(() => {
  //   console.log("Filterchains", dataContext.dataState.filterChains);
  //   // Read tag data
  //   // filter tag data
  //   // set graph data
  // }, [dataContext.dataState]);

  useEffect(() => {
    if (typeof document != "undefined" && sunburstData.lenth != 0) {
      console.log("Sunburst received data", sunburstData);
      Chart.data(sunburstData)
        .label("title")
        .handleNonFittingLabel((label, availablePx) => {
          const numFitChars = Math.round(availablePx / 7); // ~7px per char
          return numFitChars < 5
            ? null
            : `${label.slice(0, Math.round(numFitChars) - 3)}...`;
        })
        .width("500")
        .radiusScaleExponent(0.9)
        .height("500")
        .maxLevels(3)
        .color((node) => node.color)
        .excludeRoot(true)
        .showTooltip(() => true)
        .tooltipTitle((node) => node.title)
        .size((node) => (node.children.length ? null : node.value))(
        document.getElementById("fabi")
      );
      console.log("Sunburst Rendering");
    } else {
      console.log("Sunburst did NOT receive data");
    }
  }, [sunburstData]);

  // statusContext.statusDispatch({
  //   type: "updateStatus",
  //   payload: "Sunburst rendering",
  // });
  return (
    <>
      {clicked && (
        <ContextMenu top={points.y} left={points.x}>
          <ul>
            {filterContext.filterState.filterChains.map((filterChain) => {
              return (
                <li
                  onClick={() =>
                    handleAddToFilterChain(
                      focusedKeyword.target.__data__.data,
                      filterChain
                    )
                  }
                >
                  {filterChain.title}
                </li>
              );
            })}

            <hr className="mx-0 my-1"></hr>
            {filterContext.filterState.filterChains[0].keywords.length &&
            filterContext.filterState.filterChains.length > 0 ? (
              <li
                onClick={() => {
                  handleCreateFilterChain([
                    focusedKeyword.target.__data__.data,
                  ]);
                }}
              >
                Create New Filterchain
              </li>
            ) : (
              <></>
            )}
          </ul>
        </ContextMenu>
      )}
      {
        // <div className="pt-6">
        <div
          id="fabi"
          className="z-50"
          onContextMenu={(e) => {
            console.log(e);

            e.preventDefault();
            setFocusedKeyword(e);
            setClicked(true);

            setPoints({
              x: e.pageX,
              y: e.pageY,
            });

            // console.log("Right Click", e.pageX, e.pageY);
          }}
        ></div>
        // </div>
      }
    </>
  );
};

export default SunburstRendering;
