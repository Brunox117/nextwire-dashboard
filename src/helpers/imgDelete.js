import { deleteObject, ref } from "firebase/storage";
import { FirebaseSTORAGE } from "../firebase/config";

export const imgDelete = async (imageUrl) => {
  try {
    const storageRef = ref(FirebaseSTORAGE, imageUrl);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error(`Error al borrar la imagen: ${error.message}`);
    return false;
  }
};
