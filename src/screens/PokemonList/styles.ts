import {
  StyleSheet,
} from 'react-native';


export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingVertical: 16 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2563EB',
    alignSelf:'center'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: { width: 40, height: 40, marginRight: 12 },
  name: { fontSize: 16, textTransform: 'capitalize', color: '#111' },
  loading: { textAlign: 'center', marginTop: 30 },
  error: {color: 'red'}
});
