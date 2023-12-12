import {
  useRef,
  useCallback,
  memo,
  useEffect,
  useContext,
  useState,
} from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import { getAdaBaseUrl } from "../../utils/adaApi";
import { DataContext } from "../../Context/DataContext";
import { GraphContext } from "../../Context/GraphContext";
import { FilterContext } from "../../Context/FilterContext";
import { getRandomColor } from "../../utils/utils";
import SpriteText from "three-spritetext";

const prepareInitGraph = (data) => {
  const nodes = [];
  let links = [];
  const color = getRandomColor();

  data.alphabeticalKeywords.forEach((item) => {
    nodes.push({ ...item, type: "keyword", color: "#000000" });
  });

  data.allArtworks.forEach((artwork) => {
    nodes.push({ ...artwork, type: "artwork" });
    artwork.keywords.forEach((keyword) => {
      //links.push({source: keyword.uid, target: artwork.uid, color: '#000000'})
    });
  });
  links = createConsecutiveLinks(nodes, "#000000");
  //Create Nodelist of Unique Artworks and Keywords
  //Create Link List accourting to Artwork -> Keyword
  //console.log('prepareInit:', nodes, links)

  return {
    nodes,
    links,
  };
};

function filterArtworksAndKeywords(artworks, filterChains) {
  // console.log("filterArtworksAndKeywords", filterChains);
  // Convert each filter chain to a set of keyword UIDs, ignoring empty filter chains
  const filterSets = filterChains
    .filter((fc) => fc.keywords && fc.keywords.length > 0)
    .filter((fc) => !fc.muted)
    .map((fc) => new Set(fc.keywords.map((keyword) => keyword.uid)));

  // If there are no valid filter chains, return empty arrays
  if (filterSets.length === 0) {
    return { filteredArtworks: [], includedKeywords: [] };
  }

  // Initialize sets to store unique artwork UIDs
  const filteredArtworksSet = new Set();

  // Initialize a map to store keywords from filter chains
  const filterChainKeywordsMap = new Map();

  // Iterate over each artwork
  artworks.forEach((artwork) => {
    // Convert the artwork's keywords to a set of UIDs
    const artworkKeywords = new Set(
      artwork.keywords.map((keyword) => keyword.uid)
    );

    // Check each filter
    filterSets.forEach((filterSet) => {
      // If the artwork contains all the keywords in the filter
      if ([...filterSet].every((uid) => artworkKeywords.has(uid))) {
        filteredArtworksSet.add(artwork.uid);
        // Add keywords from this filter set to the map
        filterSet.forEach((uid) => {
          const keyword = artwork.keywords.find((kw) => kw.uid === uid);
          if (keyword) {
            keyword.color = filterSet.color;
            filterChainKeywordsMap.set(uid, keyword);
          }
        });
      }
    });
  });

  // Convert the sets and map back to lists
  const filteredArtworks =
    filterChains.length > 0 && filterChains[0].keywords.length > 0
      ? artworks.filter((artwork) => filteredArtworksSet.has(artwork.uid))
      : artworks;
  console.log(filterChainKeywordsMap);
  const includedKeywords = Array.from(filterChainKeywordsMap.values());

  return { filteredArtworks, includedKeywords, filterChains };
}

const createConsecutiveLinks = (inputArr, color) => {
  return inputArr.slice(0, -1).map((currentObject, index) => {
    const source = currentObject.uid;
    const target = inputArr[index + 1].uid;
    return { source: source, target: target, color: color };
  });
};

function generateGraphData(artworks, filterChains, algorithmType) {
  // console.log("generateGraphData", filterChains);
  const result = filterArtworksAndKeywords(artworks, filterChains);

  // Create nodes array with type property
  const nodes = [
    ...result.filteredArtworks.map((artwork) => ({
      ...artwork,
      type: "artwork",
    })),
    ...result.includedKeywords.map((keyword) => {
      console.log(keyword);
      return { ...keyword, type: "keyword" };
    }),
  ];

  // Initialize links array
  const links = [];

  // Process each filter chain
  filterChains.forEach((fc) => {
    const color = fc.color || "#000000"; // Default color if not provided
    fc.keywords.forEach((keyword) => {
      result.filteredArtworks.forEach((artwork, index) => {
        switch (algorithmType) {
          case "consecutive":
            // Consecutive order by sorted uids
            const alternativeLinks = createConsecutiveLinks(
              result.filteredArtworks.filter((artwork) =>
                artwork.keywords.some((kw) => kw.uid === keyword.uid)
              ),
              color
            );
            links.push(...alternativeLinks);
            break;

          // Add more cases for additional algorithms in the future

          default:
            // Original algorithm
            if (artwork.keywords.some((kw) => kw.uid === keyword.uid)) {
              links.push({
                source: keyword.uid,
                target: artwork.uid,
                color: color,
              });
            }
        }
      });
    });
  });

  // For keywords not in any filter chain, use default color
  result.includedKeywords.forEach((keyword) => {
    if (
      !filterChains.some((fc) =>
        fc.keywords.some((kw) => kw.uid === keyword.uid)
      )
    ) {
      result.filteredArtworks.forEach((artwork) => {
        if (artwork.keywords.some((kw) => kw.uid === keyword.uid)) {
          //links.push({ source: keyword.uid, target: artwork.uid, color: '#000000' });
        }
      });
    }
  });

  return { nodes, links };
}

// Filtering artworks

const Graph = memo(({ setInfoOpen }) => {
  const graphContext = useContext(GraphContext);
  const dataContext = useContext(DataContext);
  const filterContext = useContext(FilterContext);
  const [currentGraphData, setCurrentGraphData] = useState(false);
  const [textMode, setTextMode] = useState(false);

  useEffect(() => {
    const initData = prepareInitGraph(dataContext.dataState);
    graphContext.graphDispatch({
      type: "initGraph",
      payload: { graphData: initData },
    });
  }, []);

  useEffect(() => {
    graphContext.graphState.isReady &&
      setCurrentGraphData(graphContext.graphState);
    graphContext.graphState.isReady &&
      console.log("GraphState:", graphContext.graphState);
  }, [graphContext.graphState]);

  // When Filterstate changes, update Graph
  useEffect(() => {
    let filterEnabled = true;

    filterEnabled = filterContext.filterState.filterChains.some(
      (filterChain) => {
        return filterChain.keywords.length ? true : false;
      }
    );
    // console.log(filterContext.filterState);
    if (graphContext.graphState.isReady) {
      const result = filterEnabled
        ? generateGraphData(
            dataContext.dataState.allArtworks,
            filterContext.filterState.filterChains,
            filterContext.filterState.algorithmType
          )
        : prepareInitGraph(dataContext.dataState);
      console.log("REBUILD GRAPH:", result);

      graphContext.graphDispatch({
        type: "updateGraph",
        payload: { graphData: result },
      });
    }
  }, [filterContext.filterState]);

  const handleInfoView = (d) => {
    const timeoutId = setTimeout(() => {
      window.addEventListener("mousemove", (event) => {
        points.current = {
          x: event.clientX,
          y: event.clientY,
        };
      });

      d && setInfoOpen({ node: d, coordinates: points.current });
    }, 1500);

    // Clear the timeout if the component unmounts before the timeout completes
    window.removeEventListener("mousemove", (event) => {
      points.current = {
        x: event.clientX,
        y: event.clientY,
      };
    });
    return () => clearTimeout(timeoutId);
  };

  const points = useRef({
    x: 0,
    y: 0,
  });

  const fgRef = useRef();

  // const noFilter = useRef(true);

  const handleFlyToClick = useCallback(
    (node) => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current?.cameraPosition(
        {
          x: node.x * distRatio,
          y: node.y * distRatio,
          z: node.z * distRatio,
        }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
    },
    [fgRef]
  );

  useEffect(() => {
    const strength =
      filterContext.filterState.filterChains.length == 1 &&
      !filterContext.filterState.filterChains[0].keywords.length
        ? -100
        : -400;

    fgRef.current && fgRef.current.d3Force("charge").strength(strength);
  }, [fgRef.current]);

  return (
    <>
      <div
        className="position-absolute w-100 z-10"
        onContextMenu={(e) => {
          e.preventDefault();
          // console.log(e);
        }}
      >
        {graphContext.graphState.isReady && (
          <ForceGraph3D
            ref={fgRef}
            graphData={currentGraphData.graphData}
            autoPauseRedraw={false}
            backgroundColor={"#FFFFFF"}
            nodeId="uid"
            onNodeHover={(node, prevNode) => {
              handleInfoView(node);
            }}
            // scene={(scene) => console.log(scene.toJSON())}
            nodeThreeObject={(d) => {
              if (d.type == "keyword") {
                const sprite = new SpriteText(d.title);
                sprite.material.depthWrite = false; // make sprite background transparent
                sprite.color = d.color;
                // console.log(d);
                sprite.fontWeight = "bold";
                sprite.fontSize = 100;
                sprite.textHeight = 16;
                return sprite;
              } else if (d.type == "artwork") {
                if (d.previews.length) {
                  const imgTexture = new THREE.TextureLoader().load(
                    getAdaBaseUrl() + d.previews[0]
                  );
                  const material = new THREE.SpriteMaterial({
                    map: imgTexture,
                  });
                  const sprite = new THREE.Sprite(material);
                  filterContext.filterState.filterChains.length < 1 &&
                  filterContext.filterState.filterChains[0].keywords.length < 1
                    ? sprite.scale.set(100, 100, 1)
                    : sprite.scale.set(12, 12, 1);

                  return sprite;
                } else return false;
              }
            }}
            nodeLabel={(d) => {
              return d.title;
            }}
            nodeVisibility={(d) => {
              if (
                filterContext.filterState.filterChains.length == 1 &&
                filterContext.filterState.filterChains[0].keywords.length < 1
              ) {
                return d.type == "artwork" ? true : false;
              } else return true;
              // return true;
            }}
            nodeRelSize={5}
            nodeThreeObjectExtend={false}
            enableNavigationControls={true}
            linkVisibility={(link) => (link.color === "#000000" ? false : true)} //{noFilter.current ? false : true}
            linkColor={(link) => link.color}
            linkCurvature={0}
            linkResolution={2}
            linkOpacity={0.4}
            nodeColor={() => "#e4407b"}
            // nodeDesc={"comment"}

            // controlType={"fly"}
            // onBackgroundRightClick={() => {
            //   handleRightClick(null);
            // }}
            enableNodeDrag={false}
            onNodeClick={(node) => {
              handleFlyToClick(node);
            }}
            linkWidth={(link) => {
              // (link.color === "#000000" ? 0 : 0.3)
              return link.color === "#000000" ? 0 : 5;
            }}
            // warmupTicks={200}
          />
        )}
      </div>
    </>
  );
});

// export default memo(Graph);
export default Graph;
