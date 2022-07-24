/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable object-curly-newline */
import { getAuth, User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../libs/Firebase';

interface IAuthContext {
  currentUser: User | null | undefined;
}

const AuthContext = createContext<IAuthContext>({ currentUser: undefined });

function AuthProvider(props: any) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    auth.onAuthStateChanged((user: User) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
