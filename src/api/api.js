import axios from "axios";

axios.defaults.withCredentials = true;
const API = process.env.REACT_APP_API_URL;

async function GetSystems(id=null) {
    if(id !== null)
        return await axios.get(API + `api/system?id=${id}`);
    else
        return await axios.get(API + 'api/system');
}

async function UpdateSystem(id, payload) {
    return await axios.put(API + 'api/system', {
        sys_id: id,
        payload: payload
    });
}

async function UpdateUser(payload) {
    return await axios.post(API + 'api/user', {
        payload: payload
    });
}

async function DeleteSystem(id) {
    return await axios.delete(API + `api/system?id=${id}`);
}

async function GetLogs(id=null) {
    if(id)
        return await axios.get(API + `api/system/activity?id=${id}`);
    return await axios.get(API + `api/system/activity`);
}

async function DeleteLogs() {
    return await axios.delete(API + 'api/system/activity');
}

async function GetRules(id) {
    return await axios.get(API + `api/system/rules?id=${id}`);
}

async function NewRule(payload) {
    return await axios.post(API + `api/system/rules`, payload);
}

async function DeleteRule(id, resource) {
    return await axios.delete(API + `api/system/rules?id=${id}&resource=${resource}`);
}
export {GetSystems, UpdateSystem, UpdateUser, DeleteSystem, GetLogs, GetRules, NewRule, DeleteRule, DeleteLogs};
