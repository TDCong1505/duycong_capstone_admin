import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const RoleService = {

    getAll: params => ApiService().get(servicePaths.getAllRoles),

}

export default RoleService;