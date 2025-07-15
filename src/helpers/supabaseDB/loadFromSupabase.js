import { supabaseDB } from "./supabaseInstance";

export const loadProductsFromSupabase = async () => {
  const { data, error } = await supabaseDB.from("products").select("*");
  const products = [];
  data.forEach((product) => {
    products.push({ id: product.id, ...product });
  });
  if (error) {
    console.error(error);
  }
  return products;
};

export const loadCategoriesFromSupabase = async () => {
  const { data } = await supabaseDB.from("categories").select("*");
  const categories = [];
  data.forEach((category) => {
    categories.push({ id: category.id, ...category });
  });
  return categories;
};

export const loadApplicationsFromSupabase = async () => {
  const { data } = await supabaseDB.from("applications").select("*");
  const applications = [];
  data.forEach((application) => {
    applications.push({ id: application.id, ...application });
  });
  return applications;
};

export const loadFamiliesFromSupabase = async () => {
  const { data } = await supabaseDB.from("families").select("*");
  const families = [];
  data.forEach((family) => {
    families.push({ id: family.id, ...family });
  });
  return families;
};
