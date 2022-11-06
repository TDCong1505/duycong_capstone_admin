import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const UserService = {

    getById: params => ApiService().get(servicePaths.getUserById + params),
    updateUser:(params,data) => ApiService().post(servicePaths.updateUser + params , data),
    getByUserName: params => ApiService().get(servicePaths.getUserByUsername + params),
    
}

export default UserService;