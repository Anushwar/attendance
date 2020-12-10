import axios from 'axios';

/**
 * This is the rest end point and
 * REST stands for state transfer.
 *
 * here redux states will be transferred to backend.
 * and nothing more.
 */
const baseAxios = axios.create({
  baseURL: `http://localhost:5000/`,
});

const setAuthHeaders = (id, password) => {
  baseAxios.defaults.headers.common['x-user-id'] = id;
  baseAxios.defaults.headers.common['x-user-password'] = password;
};

// TODO remoce later
setAuthHeaders('admin', 'admin');

export default baseAxios;
export { setAuthHeaders };
