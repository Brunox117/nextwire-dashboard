import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const loadProducts = async () => {
  const collectionRef = collection(FirebaseDB, "/products/");
  const docs = await getDocs(collectionRef);
  const products = [];
  docs.forEach((product) => {
    products.push({ id: product.id, ...product.data() });
  });
  return products;
};

export const loadCategories = async () => {
  const collectionRef = collection(FirebaseDB, "/categories/");
  const docs = await getDocs(collectionRef);
  const categories = [];
  docs.forEach((category) => {
    categories.push({ id: category.id, ...category.data() });
  });
  return categories;
};
