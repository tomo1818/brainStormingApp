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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../libs/Firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);

  const auth = getAuth(app);
  const handleEmailChange = (value: string) => setEmail(value);
  const handlePasswordChange = (value: string) => setPassword(value);

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

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const emailError = handleEmailValidation(email);
    const passwordError = handlePasswordValidation(password);
    if (!emailError && !passwordError) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          navigate('/mypage');
        });
    }
  };

  return (
    <Stack maxWidth="900px" m="0 auto" p="5">
      <Text fontWeight="bold" size="lg">
        ログイン
      </Text>
      <form>
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
              パスワードは8文字以上10文字以内で入力してください。
            </FormErrorMessage>
          )}
        </FormControl>
        <Button size="md" mt={4} colorScheme="teal" onClick={handleSubmit}>
          ログイン
        </Button>
      </form>
    </Stack>
  );
}

export default Login;
