import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { DataContext } from "../Context/DataContext";
import Graph from "./Universe/Graph.js";
import { MutatingDots } from "react-loader-spinner";
import Filters from "./Filters/Filters";
import CloseIcon from "@mui/icons-material/Close";
import Collections from "./Collections/Collections";
import InfoView from "../pages/InfoView.js";
import Impressum from "../pages/Impressum.js";
import { Help } from "../pages/Help.js";
import {
  createCollectionAPI,
  deleteCollectionAPI,
  deleteFromCollectionAPI,
  changeTitleCollectionAPI,
  addToCollectionAPI,
  setCollectionAPI,
} from "../utils/adaApi.js";
import {
  replaceObjectByUID,
  removeObjectByUID,
  extractUids,
  findObjectByUID,
  doesArrayContainMatchingUid,
  getRandomColor,
} from "../utils/utils.js";
import { InfoContainer } from "./Universe/InfoContainer.js";
import FlyingFilters from "../UI/FlyingFilters.js";
import {
  ARTWORKSINCOLLECTIONLIMIT,
  COLLECTIONSLIMIT,
} from "../utils/config.js";
import { MenuButtons } from "./Universe/MenuButtons.js";
import GraphState from "../Context/GraphContext.js";
import FilterState from "../Context/FilterContext.js";
const Serendipity = () => {
  // * STATE DECLARATIONS

  const dataContext = useContext(DataContext);
  const [hudOpen, setHudopen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [infoContainerEnabled, setInfoContainerEnabled] = useState(true);

  const handleIntroHide = () => {
    // After a timeout of 2000 milliseconds (2 seconds), hide the div.
    const timeoutId = setTimeout(() => {
      // console.log("hidden");
      setIsVisible(false);
    }, 12040);

    // Clear the timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timeoutId);
  };

  // * MANAGING USER COLLECTIONS FUNCTIONS
  //  * For local testing purposes just comment put the api-calls, and comment in the Datadispatch stuff

  const handleCreateUserCollection = useCallback(
    async (artworks = null, title = null) => {
      // console.log(dataContext.dataState.userCollections);

      const state = dataContext.dataState.userCollections;
      if (state.length < COLLECTIONSLIMIT) {
        // ************************************************
        // await createCollectionAPI(
        //   title ? title : "Collection " + state.length.toString(),
        //   artworks ? artworks : []
        // ).then((response) => {
        //   let newUserCollection = {
        //     uid: response.uuid,
        //     title: response.title,
        //     artworks: dataContext.dataState.allArtworks.filter((obj) =>
        //       response.collection.includes(obj.uid)
        //     ),
        //     color: getRandomColor(),
        //   };
        //   state.push(newUserCollection);
        //   dataContext.dataDispatch({
        //     type: "addUserCollection",
        //     payload: state,
        //   });
        // });
        // ************************************************
        let newUserCollection = {
          uid: state.length,
          title: title ? title : "Collection " + state.length.toString(),
          artworks: artworks ? [...artworks] : [],
          color: getRandomColor(),
        };
        state.push(newUserCollection);
        dataContext.dataDispatch({
          type: "addUserCollection",
          payload: state,
        });
        // ****************************************
      }
    }
  );

  const handleDeleteUserCollection = useCallback(async (collectionUid) => {
    let state = dataContext.dataState.userCollections;
    // ************************************************
    // await deleteCollectionAPI(collectionUid).then((response) => {
    //   state = removeObjectByUID(state, collectionUid);

    //   dataContext.dataDispatch({
    //     type: "removeUserCollection",
    //     payload: state,
    //   });
    // });
    // ************************************************
    state = removeObjectByUID(state, collectionUid);

    dataContext.dataDispatch({
      type: "removeUserCollection",
      payload: state,
    });
    // ************************************************
  });

  const handleEditCollectionTitle = useCallback(
    async (e, collection, TextRef, setIsEditing) => {
      e.preventDefault();

      if (collection.title != TextRef.current.value) {
        const state = dataContext.dataState.userCollections;
        collection.title = TextRef.current.value;
        // ************************************************
        // await changeTitleCollectionAPI(
        //   collection.uid,
        //   TextRef.current.value
        // ).then((response) => {
        //   dataContext.dataDispatch({
        //     type: "renameCollectionTitle",
        //     payload: replaceObjectByUID(state, collection.uid, collection),
        //   });
        // });
        // ************************************************
        dataContext.dataDispatch({
          type: "renameCollectionTitle",
          payload: replaceObjectByUID(state, collection.uid, collection),
        });
      }
      setIsEditing(false);
      // ************************************************
    }
  );

  const handleDeleteArtworkFromCollection = useCallback(
    async (artwork, collectionUid = 0) => {
      const state = dataContext.dataState.userCollections;
      // ************************************************
      await deleteFromCollectionAPI(collectionUid, [artwork.uid]).then(
        (response) => {
          const collectionToRemoveArtworkFrom = state.find(
            (obj) => obj.uid === collectionUid
          );
          removeObjectByUID(
            collectionToRemoveArtworkFrom.artworks,
            artwork.uid
          );
          replaceObjectByUID(
            state,
            collectionUid,
            collectionToRemoveArtworkFrom
          );

          dataContext.dataDispatch({
            type: "removeArtworkFromUserCollections",
            payload: state,
          });
        }
      );
      // ************************************************
      // const collectionToRemoveArtworkFrom = state.find(
      //   (obj) => obj.uid === collectionUid
      // );
      // removeObjectByUID(collectionToRemoveArtworkFrom.artworks, artwork.uid);
      // replaceObjectByUID(state, collectionUid, collectionToRemoveArtworkFrom);

      // dataContext.dataDispatch({
      //   type: "removeArtworkFromUserCollections",
      //   payload: state,
      // });
      // ************************************************
    }
  );

  const handleAddToUserCollection = useCallback(
    async (collectionUuid = 0, artworks) => {
      // console.log(collectionUuid, artworks);
      const state = dataContext.dataState.userCollections;
      // console.log(state.find((collection) => collection.uid == collectionUuid));
      if (
        state.find((collection) => collection.uid == collectionUuid).artworks
          .length < ARTWORKSINCOLLECTIONLIMIT
      ) {
        // ************************************************
        console.log(findObjectByUID(state, collectionUuid.toString()));
        await addToCollectionAPI(collectionUuid, extractUids(artworks)).then(
          (response) => {
            if (
              !doesArrayContainMatchingUid(
                findObjectByUID(state, collectionUuid.toString()).artworks,
                artworks
              )
            ) {
              state
                .find((collection) => collection.uid === collectionUuid)
                .artworks.push(...artworks);
              dataContext.dataDispatch({
                type: "addArtworkToUserCollections",
                payload: state,
              });
            } else {
              console.warn("Already in Collection");

              return;
            }
          }
        );
        // ************************************************
        // if (
        //   !doesArrayContainMatchingUid(
        //     findObjectByUID(state, collectionUuid.toString()).artworks,
        //     artworks
        //   )
        // ) {
        //   state
        //     .find((collection) => collection.uid === collectionUuid)
        //     .artworks.push(...artworks);
        //   dataContext.dataDispatch({
        //     type: "addArtworkToUserCollections",
        //     payload: state,
        //   });
        // } else {
        //   console.warn("Already in Collection");

        //   return;
        // }
        // ************************************************
      }
    }
  );

  const handleMoveToUserCollection = useCallback(
    async (artwork, oldCollection, newCollection) => {
      // console.log(artwork, oldCollection, newCollection);
      const state = dataContext.dataState.userCollections;
      // ************************************************
      await Promise.all([
        await addToCollectionAPI(newCollection.uid, [artwork.uid]),
        await deleteFromCollectionAPI(oldCollection.uid, [artwork.uid]),
      ]).then((response) => {
        removeObjectByUID(oldCollection.artworks, artwork.uid);
        replaceObjectByUID(state, oldCollection.uid, oldCollection);
        state
          .find((collection) => collection.uid === newCollection.uid)
          .artworks.push(artwork);

        dataContext.dataDispatch({
          type: "removeArtworkFromUserCollections",
          payload: state,
        });
      });
      // ************************************************
      // removeObjectByUID(oldCollection.artworks, artwork.uid);
      // replaceObjectByUID(state, oldCollection.uid, oldCollection);
      // state
      //   .find((collection) => collection.uid === newCollection.uid)
      //   .artworks.push(artwork);

      // dataContext.dataDispatch({
      //   type: "removeArtworkFromUserCollections",
      //   payload: state,
      // });
      // ************************************************
    }
  );

  const handleCloneToUserCollection = useCallback(
    async (artwork, newCollection) => {
      // console.log(artwork, oldCollection, newCollection);
      const state = dataContext.dataState.userCollections;
      // ************************************************
      await addToCollectionAPI(newCollection.uid, [artwork.uid]).then(
        (response) => {
          state
            .find((collection) => collection.uid === newCollection.uid)
            .artworks.push(artwork);

          dataContext.dataDispatch({
            type: "addArtworkToUserCollections",
            payload: state,
          });
        }
      );
      // ************************************************
      // state
      //   .find((collection) => collection.uid === newCollection.uid)
      //   .artworks.push(artwork);

      // dataContext.dataDispatch({
      //   type: "addArtworkToUserCollections",
      //   payload: state,
      // });
      // ************************************************
    }
  );

  const classNames = `textShadow introduction position-absolute z-50 align-self-center ${
    isVisible ? "" : "hidden"
  }`;

  useEffect(() => {
    if (dataContext.dataState.dataReady) {
      console.log(dataContext.dataState);
      handleIntroHide();
    }
  }, [dataContext.dataState.dataReady]);

  return (
    <>
      <div className="position-absolute overflow-hidden w-100 h-100 d-flex  justify-content-center flex-wrap z-50">
        {dataContext.dataState.dataReady ? (
          <div className={classNames}>
            <h1 className="font-weight-bold textShadow adaPink ">
              Serendipity
            </h1>

            <h2 className="font-weight-light textShadow">
              A tool for experimental research
            </h2>
          </div>
        ) : (
          <></>
        )}

        {dataContext.dataState.dataReady ? (
          <>
            <FilterState>
              {/* {hudOpen ? <></> : <FlyingFilters />} */}
              <div className="position-absolute w-100 h-100">
                {infoContainerEnabled && infoOpen && !hudOpen && (
                  <InfoContainer
                    node={infoOpen.node}
                    coordinates={infoOpen.coordinates}
                    setInfoOpen={setInfoOpen}
                    handleDeleteArtworkFromCollection={
                      handleDeleteArtworkFromCollection
                    }
                    handleAddToUserCollection={handleAddToUserCollection}
                  />
                )}
                {hudOpen && (
                  <div className="absolute end-100 top-0 m-3">
                    <CloseIcon onClick={() => setHudopen(false)} />
                  </div>
                )}
                {hudOpen == "filters" && (
                  <GraphState>
                    <Filters
                      handleCreateUserCollection={handleCreateUserCollection}
                    ></Filters>
                  </GraphState>
                )}
                {hudOpen == "collections" && (
                  <Collections
                    handleCreateUserCollection={handleCreateUserCollection}
                    handleDeleteUserCollection={handleDeleteUserCollection}
                    handleEditCollectionTitle={handleEditCollectionTitle}
                    handleDeleteArtworkFromCollection={
                      handleDeleteArtworkFromCollection
                    }
                    handleMoveToUserCollection={handleMoveToUserCollection}
                    handleCloneToUserCollection={handleCloneToUserCollection}
                    key={`collectionsComponent`}
                  />
                )}
                {hudOpen == "info" && <InfoView></InfoView>}
                {hudOpen == "impressum" && <Impressum></Impressum>}
                {hudOpen == "help" && <Help></Help>}

                <MenuButtons
                  hudOpen={hudOpen}
                  setHudopen={setHudopen}
                  infoContainerEnabled={infoContainerEnabled}
                  setInfoContainerEnabled={setInfoContainerEnabled}
                />

                <div className={hudOpen ? "dimmed z-30" : "z-30"}>
                  <GraphState>
                    {dataContext.dataState.dataReady ? (
                      <Graph setInfoOpen={setInfoOpen} />
                    ) : (
                      <></>
                    )}
                  </GraphState>
                </div>
              </div>
            </FilterState>
          </>
        ) : (
          <div className="h-100 d-flex text-center justify-content-center align-content-center flex-wrap">
            <MutatingDots
              height="100"
              width="100"
              color="#cccccc"
              secondaryColor="#777777"
              radius="20"
              ariaLabel="serendipity-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Serendipity;
