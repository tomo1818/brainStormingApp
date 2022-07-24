import { Container, Spinner, Text } from '@chakra-ui/react';

function Loading() {
  return (
    <Container
      textAlign="center"
      h="calc(100vh)"
      display="flex"
      alignItems="center"
      position="relative"
    >
      <Spinner margin="0 auto" />
      <Text
        display="block"
        position="absolute"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%);"
        color="green.400"
        fontSize="2xl"
        fontWeight={700}
      >
        Loading
      </Text>
    </Container>
  );
}

export default Loading;
