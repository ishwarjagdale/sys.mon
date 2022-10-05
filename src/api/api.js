import axios from "axios";

axios.defaults.withCredentials = true;
const API = process.env.REACT_APP_API_URL;

async function GetSystems() {
    return await axios.get(API + 'api/system');
}

export {GetSystems};
