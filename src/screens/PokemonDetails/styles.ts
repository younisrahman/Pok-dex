import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    textTransform: 'uppercase',
    color: '#2563EB',
  },
  imageWrapper: {
    width: 350,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  loaderWrapper: {
    position: 'absolute',
    top: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontWeight: '400',
    color: '#333',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  loading: {
    fontSize: 18,
    color: '#999',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});
