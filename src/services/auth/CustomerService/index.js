import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const CustomerService = {

    getAll: params => ApiService().get(servicePaths.getAll),
    getAllPageable: params => ApiService().get(servicePaths.getAllPageable + params),
    getById: params => ApiService().get(servicePaths.getCustomerById + params),
    updateCustomer: (params,data) => ApiService().put(servicePaths.updateCustomer + params,data),
    createCustomer: data => ApiService().post(servicePaths.createCustomer,data),
    getByOrderId:params => ApiService().get(servicePaths.getCustomerByOrderId + params),

}

export default CustomerService;