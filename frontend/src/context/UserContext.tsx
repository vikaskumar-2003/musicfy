import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import toast, { Toaster } from "react-hot-toast";

const server = "http://localhost:5000";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  playlist: string[];
}

interface UserContextType {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  btnLoading: boolean;
  loginUser: (
    email: string,
    password: string,
    navigate: (path: string) => void,
  ) => Promise<void>;
  
  registerUser: (
    email: string,
    password: string,
    name:string,
    navigate: (path: string) => void,
  ) => Promise<void>;

   addToPlaylist:(id:string)=>void

  logoutUser:()=>Promise<void>
 
 

}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  async function loginUser(
    email: string,
    password: string,
    navigate: (path: string) => void,
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setBtnLoading(false);
      setIsAuth(true);
      navigate("/")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  }


   async function registerUser(
    email: string,
    password: string,
    name:string,
    navigate: (path: string) => void,
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/user/register`, {
        email,
        password,
        name
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setBtnLoading(false);
      setIsAuth(true);
      navigate("/")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  }

  async function logoutUser(){

    localStorage.clear()
  setUser(null)
  setIsAuth(false)
 
  toast.success("user logged out")

  }

  async function addToPlaylist(id:string){

   try {

    const {data}=await axios.post(`${server}/api/v1/song/${id}`,{},{
        headers:{
            token:localStorage.getItem("token")
        }
    })

    toast.success(data.message)
    fetchUser()
    
   } catch (error:any) {
    toast.error(error?.response?.data?.message||"An Error Occured")
   }

  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUser(data);
      setIsAuth(true)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    finally {
    setLoading(false);
  }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isAuth, loading, btnLoading, loginUser,registerUser,logoutUser,addToPlaylist }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUserData = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserData must be used within a UserProvide");
  }

  return context;
};
