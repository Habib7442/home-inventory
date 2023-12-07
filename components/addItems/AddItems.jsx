import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { addItemToInventory } from "./addItemDatabse";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { storage } from "../../config";

const AddItemForm = () => {
  const [itemName, setItemName] = useState("");
  const [installmentDate, setInstallmentDate] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCapturePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddItem = async () => {
    try {
      if (!itemName || !installmentDate || !maintenanceDate || !image) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
  
      setIsSubmitting(true);
  
      if (!image) {
        Alert.alert("Error", "Please choose or capture a photo");
        return;
      }
  
      const response = await fetch(image);
      const blob = await response.blob();
  
      const imageRef = ref(storage, `images/${"image" + Math.random()}`);
      const snapshot = await uploadBytes(imageRef, blob);
  
      const imageUrl = await getDownloadURL(snapshot.ref);
  
      setImageList((prev) => [...prev, imageUrl]);
      setImageUrl(imageUrl);
  
      // Assuming you have a "items" collection in your Firebase Firestore
      const newItemId = await addItemToInventory(
        itemName,
        installmentDate,
        maintenanceDate,
        imageUrl
      );
  
      Alert.alert("Success", `Item added with ID: ${newItemId}`);
  
      // Reset form fields
      setItemName("");
      setInstallmentDate("");
      setMaintenanceDate("");
      setImage(null);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error adding item:", error);
      Alert.alert("Error", "Failed to add item. Please try again.");
      setIsSubmitting(false);
    }
  };
  

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Item Name</Text>
    <TextInput
      style={styles.input}
      value={itemName}
      onChangeText={setItemName}
      placeholder="Enter item name"
    />

    <Text style={styles.label}>Installment Date</Text>
    <TextInput
      style={styles.input}
      value={installmentDate}
      onChangeText={setInstallmentDate}
      placeholder="Enter installment date"
    />

    <Text style={styles.label}>Maintenance Date</Text>
    <TextInput
      style={styles.input}
      value={maintenanceDate}
      onChangeText={setMaintenanceDate}
      placeholder="Enter maintenance date"
    />

    <Text style={styles.label}>Photo</Text>
    <View style={styles.imageContainer}>
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <Button title="Capture Photo" onPress={handleCapturePhoto} />
    </View>
    {image && (
      <Image source={{ uri: image }} style={styles.imagePreview} />
    )}

    <Button
      title="Add Item"
      disabled={isSubmitting}
      onPress={handleAddItem}
    />
  </View>
);
};

const styles = StyleSheet.create({
container: {
  padding: 16,
},
label: {
  fontSize: 16,
  marginBottom: 5,
  fontWeight: "bold",
},
input: {
  height: 40,
  borderColor: "gray",
  borderWidth: 1,
  marginBottom: 16,
  padding: 8,
},
imageContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
},
imagePreview: {
  width: "100%",
  height: 200,
  resizeMode: "cover",
  marginBottom: 16,
  borderRadius: 8,
},
});

export default AddItemForm;
