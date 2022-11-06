
import ApiService from "services/ConfigService/APIService";
import { servicePaths } from "services/paths";


const ProductPhotoService = {

    getByProductCode: params => ApiService().get(servicePaths.getPhotoByProductCode + params),
    getAllPageable: params => ApiService().get(servicePaths.getProductPhotoPageable + params),
    createPhoto: (params,data) => ApiService().post(servicePaths.createProductPhoto + params , data),
    getDetail: params => ApiService().get(servicePaths.getProductPhotoById + params),
    updatePhoto: (params,data) => ApiService().put(servicePaths.updatePhoto + params,data),
    deleteById: params => ApiService().delete(servicePaths.deletePhotoById + params),
    
}


export default ProductPhotoService;