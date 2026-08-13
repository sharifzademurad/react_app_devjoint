import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
      };
    case 'FINISH_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      dispatch({
        type: 'LOGIN',
        payload: { token: savedToken, user: JSON.parse(savedUser) },
      });
    } else {
      dispatch({ type: 'FINISH_LOADING' });
    }
  }, []);

  const login = (userData, fakeToken = 'secret-jwt-token') => {
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(userData));

    dispatch({
      type: 'LOGIN',
      payload: { user: userData, token: fakeToken },
    });
  };

  const logout = () => {
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
  };

  const simulate401Error = () => {
    alert('401 Unauthorized: Tokenin vaxtı bitdi!');
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        login,
        logout,
        simulate401Error,
      }}
    >
      {!state.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);