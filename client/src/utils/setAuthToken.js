import axios from "axios";

const setAutToken = token => {
  if (token) {
    //apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delt auth header
    delete axios.defaults.headers.common["Authorixation"];
  }
};

export default setAutToken;
