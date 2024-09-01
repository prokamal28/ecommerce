import { createContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create a provider component
const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("tkn") != null) {
      setToken(localStorage.getItem("tkn"));
    }
  });
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
