import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const OrderDetailService = {

    createOrderDetail: (param1,param2,data) => ApiService().post(servicePaths.createOrderDetail + param1 + '/orderId/' + param2 , data),
    getByOrderId: (params) => ApiService().get(servicePaths.getByOrderId + params),
    getAllPageable: params => ApiService().get(servicePaths.getOrderDetailPageable + params),
    getById: params => ApiService().get(servicePaths.getOrderDetailById + params),
    
}

export default OrderDetailService;