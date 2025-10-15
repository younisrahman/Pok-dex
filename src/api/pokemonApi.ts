import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_API_URL || 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemons: builder.query<any, number | void>({
      query: (offset = 0) => `pokemon?offset=${offset}&limit=20`,
    }),
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByNameQuery } = pokemonApi;
