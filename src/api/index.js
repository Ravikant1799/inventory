import axios from "axios";

export const getInventoryData = async () => {
    return await axios.get("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory");
};
