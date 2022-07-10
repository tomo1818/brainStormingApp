import React, { useState } from 'react';
import { Box, Input, Stack, HStack } from '@chakra-ui/react';
import { RecursiveTree } from '../components/RecursiveTree';
import { Node, addListType, deleteListType } from '../types/node';

function TestPage() {
  const [list, setList] = useState<Node[]>([
    {
      id: 1,
      text: 'at 01',
      color: '',
      size: '',
      parentId: 0,
    },
    {
      id: 2,
      text: 'at 02',
      color: '',
      size: '',
      parentId: 1,
    },
    {
      id: 3,
      text: 'at 03',
      color: '',
      size: '',
      parentId: 1,
    },
    {
      id: 4,
      text: 'at 04',
      color: '',
      size: '',
      parentId: 3,
    },
    {
      id: 5,
      text: 'at 05',
      color: '',
      size: '',
      parentId: 3,
    },
    {
      id: 6,
      text: 'at 06',
      color: '',
      size: '',
      parentId: 3,
    },
    {
      id: 7,
      text: 'at 07',
      color: '',
      size: '',
      parentId: 3,
    },
  ]);

  const findUniqueId = (data: Node[]) => {
    let maxId = 0;
    // eslint-disable-next-line array-callback-return
    data.map((item:Node) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    return maxId + 1;
  };

  const addList: addListType = (text:string, color:string, size:string, parentId:number):void => {
    const newId = findUniqueId(list);
    const newNodeData = {
      id: newId,
      text,
      color,
      size,
      parentId,
    };
    const copyArray = list.slice();
    copyArray.push(newNodeData);
    setList(copyArray);
  };

  const deleteList: deleteListType = (id:number, parentId:number) => {
    console.log('deleteList');
    const copyArray = list.slice();
  };

  return (
    <div className="App">
      <h1>MindMap Page</h1>
      <Stack>
        <RecursiveTree
          list={list}
          rootId={0}
          addList={addList}
          deleteList={deleteList}
        />
      </Stack>
    </div>
  );
}

export default TestPage;
