import 'dotenv/config';

export default ({ config }: any) => ({
  ...config,
  name: 'Pokedex',
  slug: 'pokedex',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  extra: {
    BASE_API_URL: process.env.BASE_API_URL || 'https://pokeapi.co/api/v2',
  },
});
