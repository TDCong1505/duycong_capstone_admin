import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const OrderService = {

    getAllOrderPageable: params => ApiService().get(servicePaths.getAllOrderPageable + params),
    createOrder: (params,data) => ApiService().post(servicePaths.createOder + params , data),
    getById: params => ApiService().get(servicePaths.getOrderById + params),
    updateOrder: (params,data) => ApiService().put(servicePaths.updateOrder + params ,data),
    getAll: params => ApiService().get(servicePaths.getAllOrder),
    getByCustomerId: params => ApiService().get(servicePaths.getOrderByCustomerId + params),
    getByTime: (begin,end) => ApiService().get(servicePaths.getByTime + begin + "/" + end),
    exportExcel:  params => ApiService().get(servicePaths.orderExportExcel),

}

export default OrderService;