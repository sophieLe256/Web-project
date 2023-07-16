import axios from "axios";

class AuthService {
  getEndpoint() {
    return "http://localhost:5000/auth";
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
