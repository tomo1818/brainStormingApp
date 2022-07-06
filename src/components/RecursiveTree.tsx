import React from 'react';
import { Box, Input , Stack,HStack} from '@chakra-ui/react'


export const RecursiveTree = ({ list, rootId }) => {
  const targetList = list.filter(item => item.parentId === rootId);
  return (
    
        <HStack>
      {targetList.map(item => (
        <div key={item.id}>
        <Box bg='tomato' w='100%' p={4} m={0} color='white'>
          <span>#{item.id}</span> {item.name}
          <Input placeholder='Basic usage' />
        </Box>
          {list.find(l => l.parentId === item.id) &&            
            <RecursiveTree list={list} rootId={item.id} />   
          }
        
        </div>
        
      ))}
      </HStack>
 
  )
}