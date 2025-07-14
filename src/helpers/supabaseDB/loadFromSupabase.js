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
