import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  initializeFromStorage 
} from '../../../redux/store/features/restaurantAuthSlice';
import axios from 'axios';

export const useRestaurantAuth = () => {
  const dispatch = useDispatch();
  const { user, token, restaurantId, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.restaurantAuth
  );

  const login = async (email: string, password: string) => {
    try {
      dispatch(loginStart());
      
      const response = await axios.post('http://localhost:3030/auth/restaurant/login', {
        email,
        password,
      });

      if (response.data.success) {
        dispatch(loginSuccess({
          user: response.data.data.user,
          token: response.data.data.token,
          restaurantId: response.data.data.restaurantId,
        }));
        return { success: true, data: response.data.data };
      } else {
        dispatch(loginFailure(response.data.message || 'Login failed'));
        return { success: false, error: response.data.message };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  const initializeAuth = () => {
    dispatch(initializeFromStorage());
  };

  return {
    user,
    token,
    restaurantId,
    isAuthenticated,
    loading,
    error,
    login,
    signOut,
    initializeAuth,
  };
};
