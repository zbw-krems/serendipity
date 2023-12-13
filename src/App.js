import { useContext, useEffect, useCallback } from "react";
import { DataContext } from "./Context/DataContext";
import "./App.css";
import Serendipity from "./Components/Serendipity";
import { buildTree } from "./utils/sunburstUtils.js";
import {
  getAdaCollectionsApi,
  getXSpecialHeader,
  getAdaFavouritesApi,
} from "./utils/adaApi.js";
import { getRandomColor, sortAlphabeticallyByTitle } from "./utils/utils.js";

function App() {
  const dataContext = useContext(DataContext);

  const initModel = useCallback(async () => {
    try {
      let [artworkData, tagData, collectionsFromApi, favouritesFromApi] =
        await Promise.all([
          await fetch(
            // "https://dev.digitalartsarchive.at/index.php?id=31&tx_vaviz_pi2[controller]=Artworks",
            document.getElementById("root").dataset["vzArtworksUrl"],
            { credentials: "same-origin" }
          ).then((res) => res.json()),
          await fetch(
            // "https://dev.digitalartsarchive.at/index.php?id=31&tx_vaviz_pi2[controller]=Keywords",
            document.getElementById("root").dataset["vzKeywordsUrl"],
            { credentials: "same-origin" }
          ).then((res) => res.json()),
          await fetch(getAdaCollectionsApi(), getXSpecialHeader(), {
            credentials: "same-origin",
          }).then((res) => res.json()),
          await fetch(getAdaFavouritesApi(), getXSpecialHeader(), {
            credentials: "same-origin",
          }).then((res) => res.json()),
        ]);
      // console.log("FAVUUUs", collectionsFromApi);
      let collections = [
        {
          uid: 0,
          title: "Favourites",
          color: getRandomColor(),
          artworks: Array.isArray(favouritesFromApi.collection)
            ? artworkData.filter((artwork) =>
                favouritesFromApi.collection.includes(artwork.uid)
              )
            : artworkData.filter((artwork) =>
                Object.values(favouritesFromApi.collection).includes(
                  artwork.uid
                )
              ),
        },
      ];
      // console.log(artworkData);
      collectionsFromApi.collections.map((collection) => {
        // console.log(collection);
        collections.push({
          uid: collection.uuid,
          title: collection.title,
          artworks: Array.isArray(collection.collection)
            ? artworkData.filter((artwork) =>
                collection.collection.includes(artwork.uid)
              )
            : artworkData.filter((artwork) =>
                Object.values(collection.collection).includes(artwork.uid)
              ),
          color: getRandomColor(),
        });
      });

      // console.log(collections);

      dataContext.dataDispatch({
        type: "initData",
        payload: {
          artworkData,
          recursiveKeywordsData: buildTree(tagData),
          alphabeticalKeywordsData: sortAlphabeticallyByTitle(tagData),
          dataReady: true,
          graphReady: false,
          collectionData: collections,
        },
      });
    } catch (error) {
      console.warn(error);
    }
  });

  useEffect(() => {
    initModel();
  }, []);

  return (
    <div className="App">
      <Serendipity />
    </div>
  );
}

export default App;
