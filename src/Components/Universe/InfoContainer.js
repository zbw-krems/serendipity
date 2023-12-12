import { useContext, useState } from "react";
import { removeObjectByUID } from "../../utils/utils";
import { DataContext } from "../../Context/DataContext";
import CloseIcon from "@mui/icons-material/Close";
import { getAdaBaseUrl } from "../../utils/adaApi";

export const InfoContainer = ({
  node,
  setInfoOpen,
  handleDeleteArtworkFromCollection,
  handleAddToUserCollection,
}) => {
  const dataContext = useContext(DataContext);

  node =
    node.type == "keyword"
      ? dataContext.dataState.alphabeticalKeywords.find(
          (keyword) => keyword.uid == node.uid
        )
      : node;

  console.log(node);

  return (
    <>
      {node && (
        <div className="infoContainer p-3 z-20">
          <div
            className="z-30 w-100 d-flex align-content-end justify-content-end  flex-wrap"
            onClick={() => setInfoOpen(false)}
          >
            <CloseIcon fontSize={"small"} />
          </div>
          {node.type == "artwork" ? (
            <>
              <span className="badge badge-primary text-black">
                {node.artist.first_name} {node.artist.last_name}
              </span>
              <span className="badge badge-secondary text-black">
                {node.year_first}
              </span>
              <h4>{node.title}</h4>
              {node.comment && (
                <div className="threeLines">
                  <p>{node.comment}</p>
                </div>
              )}
              {node.previews.length && (
                <div className="imageContainer d-flex m-3">
                  {node.previews.map((preview) => {
                    return (
                      <img
                        className="img-thumbnail img-fluid"
                        src={getAdaBaseUrl() + preview}
                      ></img>
                    );
                  })}
                </div>
              )}
              <a href={node.url} target="_blank">
                <button className="btn btn-small btn-white mx-2">
                  Show on ADA
                </button>
              </a>

              {!dataContext.dataState.userCollections[0].artworks.some(
                (arrVal) => node.uid === arrVal.uid
              ) ? (
                <button
                  className="btn btn-small btn-white mx-2"
                  onClick={() => {
                    handleAddToUserCollection(0, [node]);
                  }}
                >
                  Add to favourites
                </button>
              ) : (
                <button
                  className="btn btn-small btn-white mx-2"
                  onClick={() => {
                    handleDeleteArtworkFromCollection(node);
                  }}
                >
                  Remove from favourites
                </button>
              )}

              <div className="d-flex flex-wrap my-3">
                {node.keywords.map((keyword) => {
                  return (
                    <span className="small badge bg-dark text-white m-1">
                      {keyword.title}
                    </span>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h4>{node.title}</h4>
              <div className="threeLines">
                <p>{node.description}</p>
              </div>
              <h4>Related Keywords</h4>
              {node.related.length && (
                <div className="d-flex flex-wrap my-3">
                  {node.related.map((keyword) => {
                    return (
                      <span className="small badge bg-dark text-white m-1">
                        {keyword.title}
                      </span>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
