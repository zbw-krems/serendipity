import { getAdaBaseUrl } from "../../utils/adaApi.js";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import DropdownComponent from "../../UI/DropdownComponent.js";

export const ArtworkInCollection = ({
  artwork,
  collection,
  artworkKey,
  dataContext,
  handleMoveToUserCollection,
  handleDeleteArtworkFromCollection,
}) => {
  console.log("ARTWORK", artwork);

  return (
    <>
      <div
        className="list-group-item flex-wrap d-flex small justify-content-start "
        key={`artworkInCollection-${artworkKey}`}
      >
        <img
          className=" rounded-circle thumb mx-2"
          src={`${getAdaBaseUrl()}${artwork.previews[0]}`}
          key={`artworkImage-${artworkKey}`}
        />
        <span
          className="truncate align-middle"
          key={`truncTitle-${artworkKey}`}
        >
          {artwork.title}
        </span>

        {collection.uid ? (
          <DropdownComponent
            dropdownItems={[
              {
                title: "Delete from Collection",
                command: handleDeleteArtworkFromCollection,
                parameters: [artwork, collection.uid],
              },
              {
                title: "Move to Collection...",
                command: null,
                subitems: dataContext.dataState.userCollections.map(
                  (otherCollection) => {
                    return {
                      title: otherCollection.title,
                      command: handleMoveToUserCollection,
                      parameters: [artwork, collection, otherCollection],
                    };
                  }
                ),
              },
            ]}
          />
        ) : (
          <DropdownComponent
            dropdownItems={[
              {
                title: "Delete from Favourites",
                command: handleDeleteArtworkFromCollection,
                parameters: [artwork, collection.uid],
              },
              {
                title: "Move to Collection...",
                command: null,
                subitems: dataContext.dataState.userCollections.map(
                  (otherCollection) => {
                    return {
                      title: otherCollection.title,
                      command: handleMoveToUserCollection,
                      parameters: [artwork, collection, otherCollection],
                    };
                  }
                ),
              },
            ]}
          />
        )}
      </div>
    </>
  );
};
