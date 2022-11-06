import config from "../config.json";

const { endpoints, requestUrlBase } = config.network;

interface Endpoint {
  path: string;
  method: string;
}

interface QueryParams {
  [key: string]: string;
}

function insertParams(url: string, params: QueryParams) {
  const re = /{(\w*)}/g;

  return url.replace(re, (_, param) => params[param]);
}

export function getEndpoint(name: string, params?: QueryParams) {
  const endpointsDict = endpoints as Record<string, Endpoint>;
  const endpoint = endpointsDict[name];

  if (!endpoint) {
    throw new Error(`There is no endpoint with name ${name}`);
  }

  const path = `${requestUrlBase}${endpoint.path}`;

  return {
    ...endpoint,
    path: params ? insertParams(path, params) : path,
  };
}
