import { applyMiddleware } from 'redux';
import { UPDATE_ADMIN_USER } from '../actions';
import { setAuthHeaders } from '../api/axios';

/**
 * Important messaging operations
 *  - Filtering
 *  - Mapping
 *  - Splitter
 *  - Aggregator
 */

const authMiddleware = () => (next) => (action) => {
  if (action.type === UPDATE_ADMIN_USER) {
    setAuthHeaders(action.user.aid, action.user.password);
  }
  next(action);
};

export default applyMiddleware(authMiddleware);
