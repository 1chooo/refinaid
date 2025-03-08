import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import firebaseApp from "@/firebase/config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Shell } from "lucide-react";

const auth = getAuth(firebaseApp);

// Define the shape of our context
interface AuthContextType {
  user: User | null;
}

// Define default context value
const defaultContextValue: AuthContextType = {
  user: null,
};

// Create the context with the defined type
export const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Custom hook with proper type inference
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};

// Props interface for the provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="loading-container">
          <Shell className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
}
