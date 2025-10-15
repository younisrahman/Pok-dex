import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import PokemonDetailsScreen from '../screens/PokemonDetails';
import * as api from '../api/pokemonApi';
import * as storage from '../utils/storage';

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({ params: { name: 'bulbasaur' } }),
}));

jest.spyOn(api, 'useGetPokemonByNameQuery').mockReturnValue({
  data: {
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    sprites: {
      front_default: 'mock.png',
      other: { 'official-artwork': { front_default: 'mock.png' } },
    },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  },
  isLoading: false,
  isError: false,
});

const store = setupStore();

describe('PokemonDetailsScreen', () => {
  it('renders Pokémon details correctly', async () => {
    render(
      <Provider store={store}>
        <PokemonDetailsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('BULBASAUR')).toBeTruthy();
      expect(screen.getByText(/grass, poison/i)).toBeTruthy();
    });
  });

  it('saves Pokémon details to cache', async () => {
    const spy = jest.spyOn(storage, 'savePokemonDetails').mockResolvedValue();

    render(
      <Provider store={store}>
        <PokemonDetailsScreen />
      </Provider>
    );

    await waitFor(() => expect(spy).toHaveBeenCalled());
  });
});
