import React, { useState } from 'react';
import { Box, Input, Stack, HStack } from '@chakra-ui/react';
import { RecursiveTree } from '../components/RecursiveTree';
import { Node } from '../types/node';
import { AddListType } from '../types/addListType';
import { DeleteListType } from '../types/deleteListType';

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
    data.forEach((item: Node) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    return maxId + 1;
  };

  const addList: AddListType = (
    text: string,
    color: string,
    size: string,
    parentId: number,
  ): void => {
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

  const deleteList: DeleteListType = (id: number, parentId: number) => {
    const copyArray = list.slice();
    const newArray = copyArray.map((item, index) => {
      if (item.parentId === id) {
        item.parentId = parentId;
      }
      if (item.id === id) {
        item.parentId = 999;
      }
      return item;
    });
    setList(newArray);
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
