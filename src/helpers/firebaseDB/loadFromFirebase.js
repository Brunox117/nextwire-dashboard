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

export const loadApplications = async () => {
  const collectionRef = collection(FirebaseDB, "/applications/");
  const docs = await getDocs(collectionRef);
  const applications = [];
  docs.forEach((application) => {
    applications.push({ id: application.id, ...application.data() });
  });
  return applications;
};

export const loadFamilies = async () => {
  const collectionRef = collection(FirebaseDB, "/families/");
  const docs = await getDocs(collectionRef);
  const families = [];
  docs.forEach((family) => {
    families.push({ id: family.id, ...family.data() });
  });
  return families;
};