import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAccessTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeLoginData,
} from "../services/LocalStorageService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthContent = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setAccessToken(getAccessTokenFromLocalStorage());
    setUser(getUserFromLocalStorage());
  }, []);

  function logoutUser() {
    setUser(null);
    setAccessToken(null);
    removeLoginData();
    setDashboardData(null)
  }

  return (
    <AuthContent.Provider
      value={{ user, accessToken, setUser, setAccessToken, logoutUser,dashboardData,setDashboardData }}
    >
      {children}
    </AuthContent.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContent);
