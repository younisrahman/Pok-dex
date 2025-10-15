import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGetPokemonByNameQuery } from '@/api/pokemonApi';
import { loadPokemonDetails, savePokemonDetails } from '@/utils/storage';
import { styles } from './styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { Image } from 'react-native';

export default function PokemonDetailsScreen() {
  const route = useRoute<any>();
  const { name } = route.params;

  const { data, isLoading, isError } = useGetPokemonByNameQuery(name);
  const [cachedData, setCachedData] = useState<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const scale = useSharedValue(0.8);

  useEffect(() => {
    (async () => {
      const local = await loadPokemonDetails(name);
      if (local) setCachedData(local);
    })();
  }, [name]);

  useEffect(() => {
    if (data) savePokemonDetails(name, data);
  }, [data]);

  const pokemon = data || cachedData;

  useEffect(() => {
    if (imageLoaded) {
      scale.value = withDelay(
        100,
        withSequence(
          withTiming(1.15, { duration: 250 }),
          withTiming(0.95, { duration: 250 }),
          withTiming(1, { duration: 300 })
        )
      );
    }
  }, [imageLoaded]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!pokemon)
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <Text style={styles.error}>No data available (offline)</Text>
        )}
      </View>
    );

  const height = (pokemon?.height * 10).toFixed(0);
  const weight = (pokemon?.weight / 10).toFixed(1);
  const imageUrl =
    pokemon?.sprites.other['official-artwork'].front_default ||
    pokemon?.sprites.front_default;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{pokemon?.name.toUpperCase()}</Text>

      {!imageLoaded && (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color="#FFCC00" />
        </View>
      )}

      <Animated.View style={[styles.imageWrapper, animatedStyle]}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          onLoadEnd={() => setImageLoaded(true)}
        />
      </Animated.View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{pokemon?.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Height</Text>
        <Text style={styles.value}>{height} cm</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Weight</Text>
        <Text style={styles.value}>{weight} kg</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Types</Text>
        <Text style={styles.value}>
          {pokemon?.types.map((t: any) => t.type.name).join(', ')}
        </Text>
      </View>
    </View>
  );
}
