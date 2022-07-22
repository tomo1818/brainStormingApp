/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { doc, updateDoc } from '@firebase/firestore';
import { RecursiveTree } from '../components/RecursiveTree';
import { Node } from '../types/node';
import { AddListType } from '../types/addListType';
import { DeleteListType } from '../types/deleteListType';
import { UpdateListType } from '../types/updateListType';
import { UserContext } from '../context/UserContext';
import { db } from '../libs/Firebase';
import Loading from '../components/Loading';

function Nodes() {
  const { user } = useContext(UserContext);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const updateNodes = async (data: Node[]) => {
    setNodes(data);
    const userDocumentRef = doc(db, 'users', user.id);
    await updateDoc(userDocumentRef, {
      nodes: data,
    });
  };

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
    const newId = findUniqueId(nodes);
    const newNodeData = {
      id: newId,
      text,
      color,
      size,
      parentId,
      x,
      y,
    };
    const copyArray = nodes.slice();
    copyArray.push(newNodeData);
    updateNodes(copyArray);
  };

  const clickAddButton = () => {
    addList('First node', '', '', 0, 100, 100);
  };

  const deleteList: DeleteListType = (id: number, parentId: number) => {
    const copyArray = nodes.slice();
    const newArray = copyArray.map((item) => {
      if (item.parentId === id) {
        item.parentId = parentId;
      }
      if (item.id === id) {
        item.parentId = 999;
      }
      return item;
    });
    updateNodes(newArray);
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
    const copyArray = nodes.slice();
    const newArray = copyArray.map((item) => {
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
    updateNodes(newArray);
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
      setNodes(user.nodes);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      className="App"
      minH="calc(100vh - 60px)"
      backgroundColor="#f3fcfa"
      backgroundImage="radial-gradient(#1abc9c 1px, #f3fcfa 1px)"
      backgroundSize="20px 20px"
    >
      <Stack>
        {nodes.length !== 0 ? (
          <RecursiveTree
            list={nodes}
            rootId={0}
            addList={addList}
            deleteList={deleteList}
            updateList={updateList}
          />
        ) : (
          <Button onClick={clickAddButton}>Create First Node</Button>
        )}
      </Stack>
    </Box>
  );
}

export default Nodes;
