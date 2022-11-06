import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const ProductDesService = {

    getByProductCode: params => ApiService().get(servicePaths.getDesByProductCode + params),
    updateProductDes: (params,data) => ApiService().put(servicePaths.updateProductDes + params,data),
    createProductDes: (params,data) => ApiService().post(servicePaths.createProductDes + params,data),
    getAllPageable: (params) => ApiService().get(servicePaths.getProductDesPageable + params),
    getById: params => ApiService().get(servicePaths.getDesById + params),

}

export default ProductDesService;