import { CONFIGURATION } from 'Configuration';
import ApiService from 'services/ConfigService/APIService';
import { servicePaths } from 'services/paths';

const AuthService = {
  
  onLogin: data => ApiService().post(servicePaths.userLogin, data),
  onLogout: data => ApiService({ prefixDomain: CONFIGURATION.prefixDomain.auth }).post(servicePaths.userLogout, data),
  onRegister: (platform, data) => ApiService({ prefixDomain: CONFIGURATION.prefixDomain.auth }).post(servicePaths.userRegister + `?platform=${platform}`, data),

};
export default AuthService;
