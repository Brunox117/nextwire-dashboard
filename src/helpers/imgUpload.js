export const fileUpload = async (file) => {
  if (!file) throw new Error("No hay un archivo para subir");

  console.log("file", file);

  try {
    //TODO: Subir el archivo al almacenamiento de supabase
    return "downloadUrl";
  } catch (error) {
    console.log(`Error al subir el archivo: ${error}`);
    throw new Error(error.message);
  }
};
