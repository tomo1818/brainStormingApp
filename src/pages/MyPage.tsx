import { Stack, Text, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../libs/Firebase';

function MyPage() {
  const [user, setUser] = useState<User>();

  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: User) => setUser(currentUser));
  }, [auth]);
  return (
    <Stack maxWidth="900px" m="0 auto" p="5">
      <Text fontWeight="bold" size="lg">
        マイページ
      </Text>
      {user ? <Text>{user.email}</Text> : <Spinner />}
    </Stack>
  );
}

export default MyPage;
