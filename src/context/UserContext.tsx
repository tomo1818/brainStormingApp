/* eslint-disable object-curly-newline */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-no-constructed-context-values */
import { Box, useToast } from '@chakra-ui/react';
import { collection, doc, getDoc, getDocs, onSnapshot, query } from '@firebase/firestore';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { db } from '../libs/Firebase';
import { Node, NodesType } from '../types/node';
import { AuthContext } from './AuthContext';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  nodes: Node[];
};

type NodeListItem = {
  id: string;
  nodes: Node[];
}

interface IUserContext {
  user: User | undefined;
  setUser: (value: User) => void;
  nodeList: NodesType[] | undefined[];
  setNodeList: (value: NodesType[]) => void;
}

const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => undefined,
  nodeList: undefined,
  setNodeList: () => undefined,
});

function UserProvider(props: any) {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<User | undefined>();
  const [nodeList, setNodeList] = useState<NodesType[] | undefined[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const toastId = 'login-alert';

  const getUser = async (id: string) => {
    const docRef = doc(db, 'users', id);
    const data = await getDoc(docRef);
    const userData = data.data() as User;
    setUser(userData);
  };

  // async
  // eslint-disable-next-line no-shadow
  const getNodeList = async (id: string) => {
    const collectionRef = collection(db, 'users', id, 'nodeList');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    // const newNodeList = [];
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   querySnapshot.forEach((item) => {
    //     newNodeList.push({
    //       id: item.id,
    //       nodes: item.data().nodes as Node[],
    //     } as NodeListItem);
    //   });
    // });
    const newNodeList = [];
    querySnapshot.forEach((item) => {
      newNodeList.push({
        id: item.id,
        nodes: item.data().nodes as Node[],
      } as NodeListItem);
    });
    setNodeList(newNodeList);
  };

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup') {
        navigate('/');
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            title: 'ログインされていません',
            description: 'ログインまたはサインアップをお願いします。',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getUser(currentUser.uid);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getNodeList(currentUser.uid);
    }
  }, [currentUser, location.pathname, navigate, toast]);

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
        nodeList,
        setNodeList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
