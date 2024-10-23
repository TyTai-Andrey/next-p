// react
import { useContext } from "react";

// local imports
// components
import { AuthContext } from "@providers/AuthProvider";

const useAuth = () => {
  const value = useContext(AuthContext);

  return value;
};

export default useAuth;
