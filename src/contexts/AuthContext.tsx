import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextData } from '../types';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

async function login(email: string, _password: string) {    // simulando chamada de API
    const fakeUser: User = { id: '1', name: 'José Guilherme', email };
    localStorage.setItem('fintrack:user', JSON.stringify(fakeUser));
    dispatch({ type: 'LOGIN', payload: fakeUser });
  }

  function logout() {
    localStorage.removeItem('fintrack:user');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}