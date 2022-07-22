/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from '../libs/Firebase';
import { AuthContext } from '../context/AuthContext';

function Signup() {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app);
  const handleNameChange = (value: string) => setName(value);
  const handleEmailChange = (value: string) => setEmail(value);
  const handlePasswordChange = (value: string) => setPassword(value);

  const handleNameValidation = (value: string): boolean => {
    const error = value.length === 0 || value.length > 10;
    setIsNameError(error);
    return error;
  };

  const handleEmailValidation = (value: string): boolean => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const error = !regex.test(value);
    setIsEmailError(error);
    return error;
  };

  const handlePasswordValidation = (value: string): boolean => {
    const error = value.length < 8 || value.length > 10;
    setIsPasswordError(error);
    return error;
  };

  const createUser = async (id: string) => {
    const data = {
      id,
      name,
      email,
      password,
      nodes: [],
    };
    await setDoc(doc(db, 'users', auth.currentUser?.uid), data);
  };

  const handleSubmit = async () => {
    const nameError = handleNameValidation(name);
    const emailError = handleEmailValidation(email);
    const passwordError = handlePasswordValidation(password);
    if (!nameError && !emailError && !passwordError) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          createUser(userCredential.user.uid);
          navigate('/test');
          // Router.push('/myPage');
          // ...
        })
        .catch((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          alert(error.code);
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    }
  };

  return (
    <Stack maxWidth="900px" m="0 auto" p="5">
      <Text fontWeight="bold" size="lg">
        ユーザー登録
      </Text>
      <form>
        <FormControl isInvalid={isNameError}>
          <FormLabel>氏名</FormLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          {isNameError && (
            <FormErrorMessage>
              氏名は1文字以上、10文字以下で入力してください
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isEmailError}>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            id="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {isEmailError && (
            <FormErrorMessage>
              正しい形式でメールアドレスを入力してください
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isPasswordError} mt={4}>
          <FormLabel>パスワード</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {isPasswordError && (
            <FormErrorMessage>
              パスワードは8文字以上、10文字以下で入力してください。
            </FormErrorMessage>
          )}
        </FormControl>
        <Button size="md" mt={4} colorScheme="teal" onClick={handleSubmit}>
          登録
        </Button>
      </form>
    </Stack>
  );
}

export default Signup;
