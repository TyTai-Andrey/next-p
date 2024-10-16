// react
import { useContext } from "react";

// local imports
// components
import { AuthContext } from "@compositions/AuthProvider";

const useAuth = () => {
  const value = useContext(AuthContext);

  return value;
};

export default useAuth;
