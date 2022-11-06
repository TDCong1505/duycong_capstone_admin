import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";

const ProductTypeService = {

    getAll: params => ApiService().get(servicePaths.getAllProductType),
    getProductTypePageable: params => ApiService().get(servicePaths.getProductTypePageable + params),
    createProductType: data => ApiService().post(servicePaths.createProductType,data),
    getDetail: params => ApiService().get(servicePaths.getProductTypeDetail + params),
    updateProductType: (params,data) => ApiService().put(servicePaths.updateProductType + params,data),
    deleteByCode: (params) => ApiService().delete(servicePaths.deleteProductType + params),

}

export default ProductTypeService;