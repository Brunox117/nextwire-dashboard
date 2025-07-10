import { getDownloadURL, uploadBytes } from "firebase/storage";
import { FirebaseSTORAGE } from "../firebase/config";

export const fileUpload = async (file) => {
  if (!file) throw new Error("No hay un archivo para subir");

  const storageRef = ref(FirebaseSTORAGE, file.name);

  try {
    //Subir el archivo al almacenamiento de firebase
    const snapshot = await uploadBytes(storageRef, file);

    //Obtener la URL de descarga del archivo
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  } catch (error) {
    console.log(`Error al subir el archivo: ${error}`);
    throw new Error(error.message);
  }
};
