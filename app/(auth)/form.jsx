import { View, Text, StyleSheet } from 'react-native'
import AddItemForm from '../../components/addItems/AddItems'

const Form = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD ITEMS</Text>
      <AddItemForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
})

export default Form