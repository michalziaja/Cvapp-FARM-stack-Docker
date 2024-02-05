import { useContext  } from "react";
import { AuthContext } from "../context/JWTAuthContext";

export const useAuth = () => {
    const authContext = useContext(AuthContext);
  
    
  
    return authContext;
  };