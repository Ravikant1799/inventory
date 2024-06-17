import Inventory from "./Inventory";
import { Provider } from "./reducer";

const InventoryContainer = () => {
  return (
    <Provider>
      <Inventory />
    </Provider>
  );
};

export default InventoryContainer;
