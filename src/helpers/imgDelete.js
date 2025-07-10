import { deleteObject, ref } from "firebase/storage";
import { FirebaseSTORAGE } from "../firebase/config";

export const imgDelete = async (imageUrl) => {
  try {
    const storageRef = ref(FirebaseSTORAGE, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.log(`Error al borrar la imagen ${error}`);
  }
};
