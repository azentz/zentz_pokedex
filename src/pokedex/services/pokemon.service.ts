import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import sessionStorageService from './session-storage.service';
import { POKEMON_RESOURCE_LIST_LIMIT } from '../constants';
import { NamedAPIResourceList, apiToPokemon, apiToNamedAPIResourceList, Pokemon } from '../models';

// Define a service using a base URL and expected endpoints
export const pokemonService = createApi({
  reducerPath: 'pokemonService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    listAllPokemon: builder.query<NamedAPIResourceList, void>({
      async queryFn(_arg: any, _queryApi: any, _extraOptions: any, fetchWithBQ: any) {
        const resourceList: NamedAPIResourceList = {
          count: 0,
          results: []
        };
        let page: number = 1;

        while (page === 1 || resourceList.count > (page - 1) * POKEMON_RESOURCE_LIST_LIMIT) {
          let resultData = {} as NamedAPIResourceList;
          const url = `pokemon?offset=${(page - 1) * POKEMON_RESOURCE_LIST_LIMIT}&limit=${POKEMON_RESOURCE_LIST_LIMIT}`;

          const sessionResult = sessionStorageService.get(url);
          if (sessionResult) {
            resultData = sessionResult as NamedAPIResourceList;
          } else {
            const fetchResult = await fetchWithBQ(url);
            if (fetchResult.error) {
              return { error: fetchResult.error as FetchBaseQueryError };
            }

            resultData = apiToNamedAPIResourceList(fetchResult.data);
            sessionStorageService.set(url, resultData);
          }

          resourceList.count = resultData.count;
          resourceList.results.push(...resultData.results);
          page++;
        }

        return { data: resourceList };
      },
    }),

    getPokemonByName: builder.query<Pokemon, string>({
      async queryFn(arg: string, _queryApi: any, _extraOptions: any, fetchWithBQ: any) {
        let resultData: Pokemon = {} as Pokemon;

        const url = `pokemon/${arg}`;
        const sessionResult = sessionStorageService.get(url);
        if (sessionResult) {
          resultData = sessionResult as Pokemon;
        } else {
          const fetchResult = await fetchWithBQ(url);
          if (fetchResult.error) {
            return { error: fetchResult.error as FetchBaseQueryError };
          }
          resultData = apiToPokemon(fetchResult.data);
          sessionStorageService.set(url, resultData);
        }

        return { data: resultData };
      },
    }),

    // getPokemonByName: builder.query<Pokemon, string>({
    //   query: (name) => `pokemon/${name}`,
    // }),
  }),
});
