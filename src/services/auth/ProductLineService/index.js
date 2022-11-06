import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const ProductLineService = {

    getAllProductLine: params => ApiService().get(servicePaths.getAllProductLine),
    getProductLinePageable: params => ApiService().get(servicePaths.getProductLinePageable + params),
    getByCode: params => ApiService().get(servicePaths.getByProductLineCode + params),
    createProductLine: (params,data) => ApiService().post(servicePaths.createProductLine + params,data),
    updateProductLine:(params,data) => ApiService().put(servicePaths.updateProductLine + params,data),

}

export default ProductLineService;