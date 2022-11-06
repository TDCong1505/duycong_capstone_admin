import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const AccountService = {

    getAllPageable: params => ApiService().get(servicePaths.getAccountPageable + params),
    
};

export default AccountService;