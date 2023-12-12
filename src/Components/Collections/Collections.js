import React, { useContext, useState } from "react";
import { DataContext } from "../../Context/DataContext.js";
import { LightTooltip } from "../../UI/styles.js";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { COLLECTIONSLIMIT } from "../../utils/config.js";
import { Collection } from "./Collection.js";

const Collections = ({
  handleCreateUserCollection,
  handleDeleteUserCollection,
  handleEditCollectionTitle,
  handleDeleteArtworkFromCollection,
  handleMoveToUserCollection,
}) => {
  const dataContext = useContext(DataContext);

  console.log("Collections rendering");

  return (
    <>
      <h2 key={`h2-CollectionsTitle`}>
        Collections ({dataContext.dataState.userCollections.length}/
        {COLLECTIONSLIMIT})
      </h2>
      <div
        className="collectionsGroup d-flex align-items-start img-thumbnail"
        key={`div-collectionsGroup`}
      >
        {dataContext.dataState.userCollections.map((collection, index) => (
          <div key={`collWrapper-${collection.uid}`}>
            <Collection
              key={`collectionComponent-${collection.uid}`}
              collection={collection}
              dataContext={dataContext}
              handleDeleteUserCollection={handleDeleteUserCollection}
              handleEditCollectionTitle={handleEditCollectionTitle}
              collectionKey={`collection-${index}-${collection.uid}`}
              handleMoveToUserCollection={handleMoveToUserCollection}
              handleDeleteArtworkFromCollection={
                handleDeleteArtworkFromCollection
              }
            />

            {!collection.uid && (
              <LightTooltip
                title="Add new Collection"
                key={`ToolTip-${index}-${collection.uid}`}
              >
                <AddCircleOutlineIcon
                  key={`AddCIrcle-${index}-${collection.uid}`}
                  onClick={() => handleCreateUserCollection()}
                />
              </LightTooltip>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Collections;
