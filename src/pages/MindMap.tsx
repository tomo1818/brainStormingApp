import React from 'react';
import { RecursiveTree} from 'src/components/RecursiveTree';
import { Box, Input , Stack,HStack} from '@chakra-ui/react'


function MindMap() {

    const list = [
        { id: 1, name: 'at 01', parentId: 0 },
        { id: 2, name: 'at 02', parentId: 1 },
        { id: 3, name: 'at 03', parentId: 2 },
        { id: 4, name: 'at 04', parentId: 3 },
        { id: 5, name: 'at 05', parentId: 3 },
        { id: 6, name: 'at 06', parentId: 4 },
        { id: 6, name: 'at 06', parentId: 4 },
       ];
   
  return (
    <div className="App">
      <h1>MindMap Page</h1>
        
        <RecursiveTree list={list} rootId={0}/>
    
    </div>
  );
}

export default MindMap;