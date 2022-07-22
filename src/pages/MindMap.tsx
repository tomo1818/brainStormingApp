/* eslint-disable object-curly-newline */
import React from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';

function MindMap() {
  return (
    <Box className="App" backgroundImage="url('/home-bg.jpg')" h="calc(100vh - 60px)">
      <Container maxW="3xl">
        <Stack
          as={Box}
          textAlign="center"
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight="110%"
          >
            <Text as="span" color="green.400">
              Mind Map App
            </Text>
          </Heading>
          <Text color="gray.500">
            A mind map is a graphical way to represent ideas and concepts. It is
            a visual thinking tool that helps structuring information, helping
            you to better analyze, comprehend, synthesize, recall and generate
            new ideas.
          </Text>
          <Stack
            direction="column"
            spacing={3}
            align="center"
            alignSelf="center"
            position="relative"
          >
            <Button
              as="a"
              colorScheme="green"
              bg="green.400"
              rounded="full"
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              href="/test"
            >
              Get Started
            </Button>
            <Button
              as="a"
              href="/signup"
              variant="link"
              colorScheme="blue"
              size="sm"
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default MindMap;
