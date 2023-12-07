import { db } from "../../config";
import { collection, addDoc } from "firebase/firestore";



export const addItemToInventory = async (
  name,
  installmentDate,
  maintenanceDate,
  imageUrl
) => {
  try {
    const docRef = await addDoc(collection(db, "homeinventory"), {
      name,
      installmentDate,
      maintenanceDate,
      photo: imageUrl,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding item to inventory:", error);
    throw error;
  }
};
