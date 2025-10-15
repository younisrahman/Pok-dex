import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '../store';
import { pokemonApi } from '../api/pokemonApi'; 
import PokemonListScreen from '../screens/PokemonList';
import fetchMock from 'jest-fetch-mock';

describe('PokemonListScreen', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    store.dispatch(pokemonApi.util.resetApiState());
  });

  it('renders Pokémon list items correctly after a successful API call', async () => {
    const mockPokemonData = {
      next: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));

    render(
      <Provider store={store}>
        <NavigationContainer>
          <PokemonListScreen />
        </NavigationContainer>
      </Provider>
    );

    expect(await screen.findByText('bulbasaur')).toBeTruthy();
    expect(screen.getByText('charmander')).toBeTruthy();
  });

  it('displays an error message when the API call fails', async () => {
    fetchMock.mockReject(new Error('API failure'));

    render(
      <Provider store={store}>
        <NavigationContainer>
          <PokemonListScreen />
        </NavigationContainer>
      </Provider>
    );

    expect(await screen.findByText('Failed to load data')).toBeTruthy();
  });
});