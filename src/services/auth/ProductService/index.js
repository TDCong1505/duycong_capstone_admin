import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";


const ProductService = {

    getAllProduct: params => ApiService().get(servicePaths.getAllProduct),
    productDetail: params => ApiService().get(servicePaths.productDetail + params),
    createProduct: (params,data) => ApiService().post(servicePaths.createProduct + params,data),
    updateProduct:(params,data) => ApiService().put(servicePaths.updateProduct + params,data),
    getProductPageable: params => ApiService().get(servicePaths.getProductPageable + params),
    getByProductLineIdPageable:(params,page) => ApiService().get(servicePaths.getProductByProductLineCode + params),

};

export default ProductService;