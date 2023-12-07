import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { db } from '../../config';
import { onSnapshot, collection } from 'firebase/firestore';

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = onSnapshot(collection(db, 'homeinventory'), (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
    });
    return () => getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {!data && <ActivityIndicator size="large" color="#0000ff" />}
      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          {item.photo && <Image source={{ uri: item.photo }} style={styles.image} />}
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.dateText}>Installment Date: {item.installmentDate}</Text>
            <Text style={styles.dateText}>Maintenance Date: {item.maintenanceDate}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  dateText: {
    color: '#555',
    marginBottom: 5,
  },
});

export default Data;
