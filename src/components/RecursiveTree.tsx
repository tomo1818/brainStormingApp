import React from 'react';
import { Box, Input , Stack,HStack,VStack} from '@chakra-ui/react'
import {Node} from '../components/Node'

export const RecursiveTree = ({ list, rootId,addList,deleteList }) => {
  const targetList = list.filter(item => item.parentId === rootId);
  return (
      <Stack>
      <HStack>
      {targetList.map(item => (
        <div key={item.id}>
        
        <Node item={item} addList={addList}deleteList={deleteList}/>
          {list.find(l => l.parentId === item.id) &&            
            <RecursiveTree list={list} rootId={item.id} addList={addList} deleteList={deleteList}/>   
          }
        
        </div>
        
      ))}
      </HStack>
      </Stack>
 
  )
}