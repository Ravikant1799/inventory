export interface ProductType {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  disabled?: boolean;
}

export interface StatsType {
  totalProducts: number;
  totalStoreValue: number;
  outOfstocks: number;
  totalCategories: number;
}

export const getMetaData = (inventory: Array<ProductType>) => {
  let totalProducts = 0;
  let outOfstocks = 0;
  let totalStoreValue = 0;
  let categories = new Set();

  inventory.forEach((product: ProductType) => {
    if (product.quantity) {
      totalProducts += product.quantity;
    } else {
      outOfstocks++;
    }

    const value = parseFloat(product.value.replace("$", "")) || 0;
    totalStoreValue += value;

    categories.add(product.category);
  });

  return {
    totalProducts,
    totalStoreValue,
    outOfstocks,
    totalCategories: categories.size,
  };
};
