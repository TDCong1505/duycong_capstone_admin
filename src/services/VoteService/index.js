import ApiService from "services/ConfigService/APIService";
import { servicePaths } from 'services/paths';

const VoteService = {

    getByProductCode: params => ApiService().get(servicePaths.getVoteByProductCode + params),
    getAllPageable: params => ApiService().get(servicePaths.getVotePageable + params),
    
}

export default VoteService;