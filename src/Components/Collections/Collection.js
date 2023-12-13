import React, { useState, useRef } from "react";
import { ArtworkInCollection } from "./ArtworkInCollection.js";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { ARTWORKSINCOLLECTIONLIMIT } from "../../utils/config.js";
import { LightTooltip } from "../../UI/styles.js";

export const Collection = ({
  collection,
  dataContext,
  handleDeleteUserCollection,
  handleEditCollectionTitle,
  handleDeleteArtworkFromCollection,
  handleMoveToUserCollection,
  collectionKey,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const TextRef = useRef();

  return (
    <div className="list-group " key={`collectionWrapper-${collectionKey}`}>
      <div
        className="list-group-item collectionItem"
        key={`collectionGroupItem-${collectionKey}`}
      >
        <h5 key={`collectionTitle-${collectionKey}`}>
          {isEditing ? (
            <form
              className="renameForm d-flex align-items-end"
              onSubmit={(e) =>
                handleEditCollectionTitle(e, collection, TextRef, setIsEditing)
              }
            >
              <input
                type="text"
                ref={TextRef}
                defaultValue={collection.title}
                className="renameInput"
              />
              <button type="submit" className="renameSubmitButton">
                <CheckIcon fontSize="smaller" />
              </button>
            </form>
          ) : (
            <>
              {collection.title} ({collection.artworks.length}/
              {ARTWORKSINCOLLECTIONLIMIT})
              {collection.uid ? (
                <EditIcon
                  fontSize={"smaller"}
                  // sx={{ paddingX: "2px", marginX: "3px" }}
                  onClick={() => setIsEditing(!isEditing)}
                />
              ) : (
                <></>
              )}
              {collection.uid != 0 ? (
                <LightTooltip title="Delete User Collection">
                  <DeleteIcon
                    key={`del-${collectionKey}`}
                    fontSize={"small"}
                    onClick={() => {
                      handleDeleteUserCollection(collection.uid, dataContext);
                    }}
                  />
                </LightTooltip>
              ) : (
                <></>
              )}
            </>
          )}
        </h5>
        {collection.artworks.length == 0 && (
          <small className="text-muted" key={`colsmall-${collection.uid}`}>
            No Artworks in Collection yet
          </small>
        )}
        <div className="list-group" key={`artworksGroup-${collectionKey}`}>
          {collection.artworks.map((artwork, index) => (
            <ArtworkInCollection
              artworkKey={`${index}-${artwork.uid}-${collection.uid}`}
              artwork={artwork}
              collection={collection}
              key={`artworkComponent-${index}-${artwork.uid}-${collection.uid}`}
              dataContext={dataContext}
              handleMoveToUserCollection={handleMoveToUserCollection}
              handleDeleteArtworkFromCollection={
                handleDeleteArtworkFromCollection
              }
            />
          ))}
          <div
            className="list-group-item collectionItem"
            key={`exit-${collectionKey}`}
          >
            <button
              className="btn btn-primary btn-small adaPinkBg border-0"
              key={`button-${collectionKey}`}
            >
              <LightTooltip title="Export to Mirador">
                <a href={`mirador/#mode=collection&${collection.uid}`}></a>
                <ExitToAppIcon />
              </LightTooltip>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
