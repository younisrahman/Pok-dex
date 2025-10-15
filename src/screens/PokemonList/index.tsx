import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetPokemonsQuery } from '@/api/pokemonApi';

import { loadPokemonList, savePokemonList } from "@/utils/storage";

import PokemonListItem from '@/components/PokemonListItem';
import { styles } from './styles';

export default function PokemonListScreen() {
  const navigation = useNavigation<any>();

  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [triggeredOnce, setTriggeredOnce] = useState(false);

  const { data, isLoading, isError } = useGetPokemonsQuery(offset);

  useEffect(() => {
    (async () => {
      const cached = await loadPokemonList();
      if (cached) {
        setPokemons(cached);
      }
    })();
  }, []);

  useEffect(() => {
    if (data?.results) {
      setPokemons((prevPokemons) => {
        const newPokemons = data.results.filter(
          (r) => !prevPokemons.find((p) => p.name === r.name)
        );
        const merged = [...prevPokemons, ...newPokemons];
        savePokemonList(merged);
        return merged;
      });

      setNextUrl(data.next);
      if (!data.next) {
        setEndReached(true);
      }
      setLoadingMore(false);
      setTriggeredOnce(false);
    }
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (!nextUrl || loadingMore || endReached) return;
    setLoadingMore(true);
    const url = new URL(nextUrl);
    const newOffset = parseInt(url.searchParams.get('offset') || '0', 10);
    setOffset(newOffset);
  }, [nextUrl, loadingMore, endReached]);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
      const distanceFromBottom =
        contentSize.height - (layoutMeasurement.height + contentOffset.y);

      if (distanceFromBottom < 250 && !triggeredOnce) {
        setTriggeredOnce(true);
        handleLoadMore();
      }
    },
    [triggeredOnce, handleLoadMore]
  );

  const renderFooter = () => {
    if (endReached)
      return (
        <Text style={{ textAlign: 'center', padding: 16, color: '#777' }}>
          No more Pokémon 😢
        </Text>
      );
    if (loadingMore)
      return <ActivityIndicator style={{ marginVertical: 16 }} color="#FFCC00" />;
    return null;
  };

  if (isError)
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Failed to load data</Text>
      </View>
    );

  if (isLoading && pokemons.length === 0)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFCC00" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex List of Pokemon </Text>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          const id = item.url.split('/').filter(Boolean).pop();
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          return (
            <PokemonListItem
              name={item.name}
              imageUrl={imageUrl}
              index={index}
              onPress={() => navigation.navigate('Details', { name: item.name })}
            />
          );
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}