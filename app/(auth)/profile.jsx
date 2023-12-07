import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

const Profile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);


  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        Welcome {user.firstName} {user.lastName}!
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
        />

        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  greetingText: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default Profile;
