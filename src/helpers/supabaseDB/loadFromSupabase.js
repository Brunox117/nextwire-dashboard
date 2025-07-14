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
