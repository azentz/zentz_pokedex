import {
  NamedAPIResource as FullNamedAPIResource,
  NamedAPIResourceList as FullNamedAPIResourceList,
} from 'pokenode-ts';

/**
 * The name and the ID of the referenced resource
 */
export interface NamedAPIResource {
  /** The name of the referenced resource */
  name: string;
  /** The ID of the referenced resource */
  id: number;
}

/**
 * Calling any API endpoint without a resource ID or name will return a paginated list of available resources for that API.
 * By default, a list "page" will contain up to 20 resources. If you would like to change this just add a 'limit' query parameter
 * to the GET request, e.g. ?=60. You can use 'offset' to move to the next page, e.g. ?limit=60&offset=60
 */
export interface NamedAPIResourceList {
  /** The total number of resources available from this API */
  count: number;
  /** The URL for the next page in the list */
  /** A list of named API resources */
  results: NamedAPIResource[];
}

export function apiToNamedAPIResource(data: FullNamedAPIResource): NamedAPIResource {
  const converted = {} as NamedAPIResource;
  if (!data) {
    return converted;
  }

  converted.name = data.name;
  converted.id = Number(data.url.split('/').slice(-2)[0]);

  return converted;
}

export function apiToNamedAPIResourceList(data: FullNamedAPIResourceList): NamedAPIResourceList {
  const converted = {} as NamedAPIResourceList;
  if (!data) {
    return converted;
  }

  converted.count = data.count;
  converted.results = [];
  data.results.forEach((resultsRow: FullNamedAPIResource) => {
    converted.results.push(apiToNamedAPIResource(resultsRow));
  });

  return converted;
}
