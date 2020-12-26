import { applyMiddleware } from 'redux';
import {
  UPDATE_ADMIN_USER,
  UPDATE_TEACHER_USER,
  UPDATE_STUDENT_USER,
} from '../actions';
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
  if (action.type === UPDATE_TEACHER_USER) {
    setAuthHeaders(action.user.tid, action.user.password);
  }
  if (action.type === UPDATE_STUDENT_USER) {
    setAuthHeaders(action.user.uid, action.user.password);
  }
  next(action);
};

export default applyMiddleware(authMiddleware);
