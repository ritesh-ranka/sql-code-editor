import products from "../data/products";

export const EMPTY_STRING = "";
export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};

const TABLE_NAMES = ["customers", "orders", "products", "shippers"];

export const TABLE_NAMES_VS_DATA = {
  products: products,
};

export default TABLE_NAMES;
