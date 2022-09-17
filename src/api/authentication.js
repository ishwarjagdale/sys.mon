import axios from "axios";

axios.defaults.withCredentials = true;
const API = process.env.API_URL;

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
    return axios.post(API + "/auth" + url, {
        name: formData.name,
        email: formData.email,
        password: formData.password
    });
}

async function Logout() {
    return await axios.get(API + "/auth/logout")
}

export {Authentication, Logout};
