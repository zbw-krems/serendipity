// * VARIABLES

//
// const baseUrl = "https://dev.digitalartsarchive.at/";
const baseUrl = "/";

// Workaround for CORS, run local Proxy Server
// const baseUrl = "http://localhost:3011/";

const adaCollectionsApi = `${baseUrl}index.php?id=169&controller=Collections&select=collection`;

let specialHeader = new Headers();

specialHeader.append(
  "X-Special-Auth",
  "test-auth-hash-c0df086e-b363-4626-a2cc-9bb6e3048180"
);
specialHeader.append("accept", "application/json");
specialHeader.append("Content-Type", "application/json");

const getRequest = {
  method: "GET",
  headers: specialHeader,
  redirect: "follow",
};

// * GETTERS / SETTERS

export const getAdaBaseUrl = () => {
  return `${baseUrl}`;
};

export const getAdaCollectionsApi = () => {
  return `${adaCollectionsApi}&list=1`;
};

export const getAdaFavouritesApi = () => {
  return `${adaCollectionsApi}&select=collection`;
};

export const getAdaCollectionApi = (uuid) => {
  return `${adaCollectionsApi}&uuid=${uuid}`;
};

export const getXSpecialHeader = () => {
  return getRequest;
};

export const createCollectionAPI = async (title, artworks = []) => {
  console.log(title, artworks);
  let body = JSON.stringify({
    create: {
      title: title,
      collection: artworks,
    },
  });

  let returnResult;
  await fetch(adaCollectionsApi, {
    method: "POST",
    headers: specialHeader,
    body: body,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      returnResult = result;
      return result;
    })
    .catch((error) => console.log("error", error));
  return returnResult;
};

export const deleteCollectionAPI = async (collectionUuid) => {
  let body = JSON.stringify({
    delete: collectionUuid,
  });
  let returnResult;
  await fetch(adaCollectionsApi, {
    method: "POST",
    headers: specialHeader,
    body: body,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      returnResult = result;
      return result;
    })
    .catch((error) => console.log("error", error));

  return returnResult;
};

export const changeTitleCollectionAPI = async (uuid, title) => {
  let body = JSON.stringify({
    title: title,
  });
  let returnResult;
  await fetch(getAdaCollectionApi(uuid), {
    method: "POST",
    headers: specialHeader,
    body: body,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      returnResult = result;
      return result;
    })
    .catch((error) => console.log("error", error));

  return returnResult;
};

export const deleteFromCollectionAPI = async (uuid, artworkUuids) => {
  let body = JSON.stringify({
    remove: artworkUuids,
  });
  let returnResult;
  await fetch(uuid ? getAdaCollectionApi(uuid) : getAdaFavouritesApi(), {
    method: "POST",
    headers: specialHeader,
    body: body,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      returnResult = result;
      return result;
    })
    .catch((error) => console.log("error", error));

  return returnResult;
};

export const addToCollectionAPI = async (uuid, artworkUuids) => {
  let body = JSON.stringify({
    add: artworkUuids,
  });
  let returnResult;
  await fetch(uuid ? getAdaCollectionApi(uuid) : adaCollectionsApi, {
    method: "POST",
    headers: specialHeader,
    body: body,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      returnResult = result;
      return result;
    })
    .catch((error) => console.log("error", error));

  return returnResult;
};

export const setCollectionAPI = async (uuid, artworks) => {
  let body = JSON.stringify({
    set: artworks,
  });
  let returnResult;
  await fetch(getAdaCollectionApi(uuid), {
    method: "POST",
    headers: specialHeader,
    body: body,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      returnResult = result;
      return result;
    })
    .catch((error) => console.log("error", error));

  return returnResult;
};
