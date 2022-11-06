import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const EmployeeService = {

    updateEmployee: (params,data) => ApiService().put(servicePaths.updateEmployee + params , data),

}

export default EmployeeService;