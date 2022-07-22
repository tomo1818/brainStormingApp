/* eslint-disable object-curly-newline */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-no-constructed-context-values */
import { Box } from '@chakra-ui/react';
import { doc, getDoc } from '@firebase/firestore';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { db } from '../libs/Firebase';
import { Node } from '../types/node';
import { AuthContext } from './AuthContext';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  nodes: Node[];
};

interface IUserContext {
  user: User | undefined;
  setUser: (value: User) => void;
}

const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => undefined,
  // nodes: [],
  // setNodes: () => undefined,
});

function UserProvider(props: any) {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getUser = async (id: string) => {
    const docRef = doc(db, 'users', id);
    const data = await getDoc(docRef);
    const userData = data.data() as User;
    setUser(userData);
  };

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      if (location.pathname !== '/login' && location.pathname !== '/signup') navigate('/');
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getUser(currentUser.uid);
      setLoading(false);
    }
  }, [currentUser, location.pathname, navigate]);

  if (loading) {
    return (
      <>
        <Box h="60px" />
        <Loading />
      </>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
