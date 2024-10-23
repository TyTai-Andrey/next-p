import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type IAuthContext = {
  hasAuth: boolean;
  token: string | null;
  logout: () => void;
  setToken: (_token: string, _timeToken?: number) => void;
};

const AuthContext = createContext<IAuthContext>({
  hasAuth: false,
  logout: () => { },
  setToken: () => { },
  token: null,
});

const oneHour = 60 * 60 * 1000;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, _setToken] = useState<string | null>(null);
  const [timeToken, _setTimeToken] = useState<number | null>(null);

  const hasAuth = useMemo(() => !!token, [token]);

  const setToken = useCallback((token: string, timeToken?: number) => {
    const _timeToken = timeToken || Date.now();
    _setToken(token);
    _setTimeToken(_timeToken);
    localStorage.setItem("token", token);
    localStorage.setItem("timeToken", String(_timeToken));
  }, []);

  useEffect(() => {
    if (!token) {
      const _timeToken = localStorage.getItem("timeToken");
      const _token = localStorage.getItem("token");
      if ((Date.now() - oneHour <= Number(_timeToken)) && _token) {
        _setToken(_token);
        _setTimeToken(Number(_timeToken));
      }
    }
  }, [token]);

  useEffect(() => {
    if (token && (Date.now() - oneHour > Number(timeToken))) {
      // TODO: need refresh token
      _setToken(null);
      _setTimeToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("timeToken");
    }
  }, [timeToken, token]);

  const logout = useCallback(() => {
    _setToken(null);
    _setTimeToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("timeToken");
  }, []);

  const value = useMemo(() => ({
    hasAuth,
    logout,
    setToken,
    token,
  }), [
    hasAuth,
    setToken,
    logout,
    token,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
