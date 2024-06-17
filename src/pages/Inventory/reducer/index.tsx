import React, {
  ReactNode,
  useReducer,
  useMemo,
  useContext,
  useCallback,
} from "react";

import { getMetaData, ProductType, StatsType } from "../utils";

interface StateType {
  inventory: Array<ProductType>;
  metaData: StatsType;
  isAdmin: boolean;
}

interface ActionType {
  type: string;
  inventory?: Array<ProductType>;
  isAdmin?: boolean;
}

interface ProviderProps {
  children: ReactNode;
}

const defaultStats: StatsType = {
  totalProducts: 0,
  totalStoreValue: 0,
  outOfstocks: 0,
  totalCategories: 0,
};

const initialState: StateType = {
  inventory: [],
  metaData: defaultStats,
  isAdmin: true,
};

const actions = {
  SET_INVENTORY: "SET_INVENTORY",
  SET_IS_ADMIN: "SET_IS_ADMIN",
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case actions.SET_INVENTORY: {
      const newMetaData = getMetaData(action.inventory || []);
      return {
        ...state,
        inventory: action.inventory || [],
        metaData: newMetaData,
      };
    }

    case actions.SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.isAdmin !== undefined ? action.isAdmin : state.isAdmin,
      };

    default:
      return state;
  }
};

const InventoryContext = React.createContext<any>(null);

export const Provider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveInventory = useCallback((inventory: Array<ProductType>) => {
    dispatch({ type: actions.SET_INVENTORY, inventory });
  }, []);

  const setIsAdmin = (isAdmin: boolean) => {
    dispatch({ type: actions.SET_IS_ADMIN, isAdmin });
  };

  const deleteProduct = useCallback(
    (productName: string) => {
      const filteredData = state.inventory.filter(
        (product: ProductType) => product.name !== productName
      );
      saveInventory(filteredData);
    },
    [state.inventory, saveInventory]
  );

  const updateProduct = useCallback(
    (updatedProduct: ProductType) => {
      const updatedData = state.inventory.map((product: ProductType) => {
        if (product.name !== updatedProduct.name) return product;
        return updatedProduct;
      });
      saveInventory(updatedData);
    },
    [state.inventory, saveInventory]
  );

  const disableProduct = useCallback(
    (productName: string) => {
      const updatedData = state.inventory.map((product: ProductType) => {
        if (product.name !== productName) return product;
        return {
          ...product,
          disabled: !!!product.disabled,
        };
      });
      saveInventory(updatedData);
    },
    [state.inventory, saveInventory]
  );

  const value = useMemo(
    () => ({
      ...state,
      saveInventory,
      setIsAdmin,
      deleteProduct,
      updateProduct,
      disableProduct,
    }),
    [state, saveInventory, deleteProduct, updateProduct, disableProduct]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within a Provider");
  }
  return context;
};
