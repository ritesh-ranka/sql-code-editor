const products = [
  {
    id: 1,
    name: "LG washing machine",
    type: "Electronics",
    price: "$100",
    resaleValue: "$50",
    manufacturedBy: "LG",
  },
  {
    id: 2,
    name: "Iphone",
    type: "Electronics",
    price: "$800",
    resaleValue: "$300",
    manufacturedBy: "Apple",
  },
  {
    id: 3,
    name: "Smart Watch series 5",
    type: "Electronics",
    price: "$80",
    resaleValue: "$30",
    manufacturedBy: "Samsung",
  },
  {
    id: 4,
    name: "Carpet",
    type: "Accessories",
    price: "$120",
    resaleValue: "$40",
    manufacturedBy: "Godrej",
  },
  {
    id: 5,
    name: "Flakes",
    type: "Food",
    price: "$10",
    resaleValue: "$0",
    manufacturedBy: "Kellogs",
  },
];

export const product_metadata = {
  id: "Number",
  name: "Varchar(50)",
  type: "Varchar(20)",
  price: "Varchar(10)",
  resaleValue: "Varchar(10)",
  manufacturedBy: "Varchar(20)",
};

export default products;
