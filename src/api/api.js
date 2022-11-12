import axios from "axios";

axios.defaults.withCredentials = true;
const API = process.env.REACT_APP_API_URL;

async function GetSystems(id=null) {
    if(id !== null)
        return await axios.get(API + `api/system?id=${id}`);
    else
        return await axios.get(API + 'api/system');
}

export {GetSystems};
