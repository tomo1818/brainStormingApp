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
  const [nodes, setNodes] = useState<Node[]>();
  const [loading, setLoading] = useState(true);
  const [scrollSize, setScrollSize] = useState({
    width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight,
  });
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
    const updateArray = copyArray.map((item) => (item.parentId === id ? ({
      id: item.id,
      text: item.text,
      color: item.color,
      size: item.size,
      parentId,
      x: item.x,
      y: item.y,
    }) : (
      item
    )));
    const newArray = updateArray.filter((item) => item.id !== id);
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
    flag: ('drag'|'drop'),
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
    if (flag === 'drag') setNodes(newArray);
    if (flag === 'drop') updateNodes(newArray);
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
      setNodes(user.nodes);
    }
  }, [user]);

  useEffect(() => {
    setScrollSize({
      width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight,
    });
  }, [nodes]);

  if (loading || !nodes) {
    return <Loading />;
  }

  return (
    <Box
      className="App"
      minH="calc(100vh - 60px)"
      backgroundColor="#f3fcfa"
      backgroundImage="radial-gradient(#1abc9c 1px, #f3fcfa 1px)"
      backgroundSize="20px 20px"
      w={scrollSize.width}
      h={scrollSize.height}
    >
      <Stack>
        {nodes.length !== 0 ? (
          <RecursiveTree
            list={nodes}
            rootId={0}
            addList={addList}
            deleteList={deleteList}
            updateList={updateList}
            parentLoc={{
              x: 0, y: 0,
            }}
          />
        ) : (
          <Button onClick={clickAddButton}>Create First Node</Button>
        )}
      </Stack>
    </Box>
  );
}

export default Nodes;
