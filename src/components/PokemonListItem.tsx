import React from 'react';
import { TouchableWithoutFeedback, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  name: string;
  imageUrl: string;
  onPress: () => void;
  index: number;
}

const PokemonListItem: React.FC<Props> = ({ name, imageUrl, onPress, index }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle((): ViewStyle => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 80).springify()}
      exiting={FadeOutDown.duration(150)}
    >
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Animated.View style={[styles.card, animatedStyle]}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.name}>{name}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default PokemonListItem;
