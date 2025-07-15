import React, { createContext, useContext, useEffect, useState } from "react";
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, UserCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

type AuthContextType = {
  user: User | null;
  username: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setUsername(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchUsername = async () => {
      try {
        const docRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(docRef);
        if (userSnap.exists()) {
          setUsername(userSnap.data().username);
        } else {
          setUsername(null);
        }
      } catch {
        setUsername(null);
      }
      setLoading(false);
    };
    fetchUsername();
  }, [user]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, username, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext must be used within AuthProvider");
  return ctx;
}
