import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from '@/screens/PokemonList';
import PokemonDetailsScreen from '@/screens/PokemonDetails';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Pokemons" 
          component={PokemonListScreen} 
          options={{ title: 'Pokédex' }} 
        />
        <Stack.Screen 
          name="Details" 
          component={PokemonDetailsScreen} 
          options={({ route }: any) => ({ title: route.params.name.toUpperCase() })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
