import axios from 'axios';

/**
 * This is the rest end point and
 * REST stands for state transfer.
 * 
 * here redux states will be transferred to backend.
 * and nothing more.
 */
export default axios.create({
    baseURL: `http://localhost:5000/`
  });