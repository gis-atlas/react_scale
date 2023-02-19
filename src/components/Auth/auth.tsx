import { createContext } from 'react';

const AuthContext = createContext({ isAuthenticated: false });

console.log(AuthContext);

export default AuthContext;
