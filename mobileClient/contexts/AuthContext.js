import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest,baseUrl} from "../utils/request";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);


  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user", error);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    loadUser();
    console.log('currentUser',user);
  }, []);
  


  return (
    <AuthContext.Provider value={{ user,setUser}}>
      {children}
    </AuthContext.Provider>
    
  );
};
