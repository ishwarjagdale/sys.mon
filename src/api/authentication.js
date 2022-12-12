import axios from "axios";
import {notify} from "../components/notifier";

axios.defaults.withCredentials = true;
const API = process.env.REACT_APP_API_URL;

async function Authentication(index, formData) {
    let url = "";
    switch (index) {
        case 1: {
            url = "/get-started";
            break;
        }
        case 2: {
            url = "/login";
            break;
        }
        case 3: {
            url = "/reset-password";
            break;
        }
        case 4: {
            url = "/verification";
            break;
        }
        default:
            break;
    }
    console.log(API + "auth" + url, formData);
    return axios.post(API + "auth" + url, formData).catch((err) => {
        notify(err.response.data.message, "failed");
    });
}

async function is_login() {
    return await axios.get(API + "auth/login").catch((err) => {
        notify(err.response.data.message, "failed");
    });
}

async function Logout() {
    return await axios.get(API + "auth/logout");
}

export {Authentication, Logout, is_login};
