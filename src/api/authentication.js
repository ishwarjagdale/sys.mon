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
        default:
            break;
    }
    console.log(API + "auth" + url);
    return axios.post(API + "auth" + url, formData).catch((err) => {
        console.log(JSON.stringify(err));
        switch (err.response.status) {
            case 409: notify("Email already registered!", "failed");break;
            case 404: notify("Users doesn't exist!", "failed");break;
            case 401: notify("Invalid credentials", "failed");break;
            default: notify(err, "failed");break;
        }
    });
}

async function Logout() {
    return await axios.get(API + "auth/logout")
}

export {Authentication, Logout};
