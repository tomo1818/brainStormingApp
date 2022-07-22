import React, { useContext, useState } from 'react';
import { Box, Input, Stack, HStack } from '@chakra-ui/react';
import { RecursiveTree } from '../components/RecursiveTree';
import { Node } from '../types/node';
import { AddListType } from '../types/addListType';
import { DeleteListType } from '../types/deleteListType';
import { UpdateListType } from '../types/updateListType';
import { UserContext } from '../context/UserContext';

function TestPage() {
  const user = useContext(UserContext);
  console.log(user);
  const [list, setList] = useState<Node[]>([
    {
      id: 1,
      text: 'at 01',
      color: '',
      size: '',
      parentId: 0,
      x: 100,
      y: 100,
    },
    {
      id: 2,
      text: 'at 02',
      color: '',
      size: '',
      parentId: 1,
      x: 200,
      y: 200,
    },
    {
      id: 3,
      text: 'at 03',
      color: '',
      size: '',
      parentId: 1,
      x: 300,
      y: 300,
    },
    {
      id: 4,
      text: 'at 04',
      color: '',
      size: '',
      parentId: 3,
      x: 400,
      y: 400,
    },
    {
      id: 5,
      text: 'at 05',
      color: '',
      size: '',
      parentId: 3,
      x: 500,
      y: 500,
    },
    {
      id: 6,
      text: 'at 06',
      color: '',
      size: '',
      parentId: 3,
      x: 600,
      y: 600,
    },
    {
      id: 7,
      text: 'at 07',
      color: '',
      size: '',
      parentId: 3,
      x: 700,
      y: 700,
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
    x: number,
    y: number,
  ): void => {
    const newId = findUniqueId(list);
    const newNodeData = {
      id: newId,
      text,
      color,
      size,
      parentId,
      x,
      y,
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

  const updateList: UpdateListType = (
    id: number,
    text: string,
    color: string,
    size: string,
    parentId: number,
    x: number,
    y: number,
  ) => {
    const copyArray = list.slice();
    const newArray = copyArray.map((item, index) => {
      if (item.id === id) {
        item.text = text;
        item.color = color;
        item.size = size;
        item.parentId = parentId;
        item.x = x;
        item.y = y;
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
          updateList={updateList}
        />
      </Stack>
    </div>
  );
}

export default TestPage;
