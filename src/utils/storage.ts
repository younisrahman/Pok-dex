import AsyncStorage from '@react-native-async-storage/async-storage';

const POKEMON_LIST_KEY = 'POKEMON_CACHE';
const POKEMON_DETAILS_PREFIX = 'POKEMON_DETAILS_';

export async function savePokemonList(data: any) {
  try {
    await AsyncStorage.setItem(POKEMON_LIST_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to cache Pokémon list', e);
  }
}

export async function loadPokemonList() {
  try {
    const json = await AsyncStorage.getItem(POKEMON_LIST_KEY);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.warn('Failed to load Pokémon list', e);
    return null;
  }
}

export async function savePokemonDetails(name: string, data: any) {
  try {
    await AsyncStorage.setItem(
      `${POKEMON_DETAILS_PREFIX}${name.toLowerCase()}`,
      JSON.stringify(data)
    );
  } catch (e) {
    console.warn('Failed to cache Pokémon details', e);
  }
}

export async function loadPokemonDetails(name: string) {
  try {
    const json = await AsyncStorage.getItem(
      `${POKEMON_DETAILS_PREFIX}${name.toLowerCase()}`
    );
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.warn('Failed to load cached details', e);
    return null;
  }
}
