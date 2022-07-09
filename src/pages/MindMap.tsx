import React from 'react';
import { Box, Input , Stack,HStack} from '@chakra-ui/react'

function MindMap() {
  return (
    <div className="App">
      <h1>MindMap Page</h1>
        <Box bg="tomato" w="100%" p={4} color="white">
          <Stack spacing={4}>
            <Input placeholder="Basic usage" />
            <HStack>
                <Input placeholder="Basic usage" />
                <Input placeholder="Basic usage" />
            </HStack>
            <HStack>
                <Input placeholder="Basic usage" />
                <Input placeholder="Basic usage" />
                <Input placeholder="Basic usage" />
                <Input placeholder="Basic usage" />
            </HStack>
          </Stack>
        </Box>
    </div>
  );
}

export default MindMap;