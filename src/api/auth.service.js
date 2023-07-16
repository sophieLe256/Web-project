import axios from "axios";

class AuthService {
  getEndpoint() {
    return `${process.env.REACT_APP_SERVER_URL}/auth`;
  }

  register(data) {
    return axios({
      url: `${this.getEndpoint()}/register`,
      method: "POST",
      data,
    });
  }

  login(data) {
    return axios({
      url: `${this.getEndpoint()}/login`,
      method: "POST",
      data,
    });
  }
}

const authService = new AuthService();
export default authService;
