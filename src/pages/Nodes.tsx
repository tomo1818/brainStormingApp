/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { addDoc,
  doc,
  setDoc,
  updateDoc,
  collection } from '@firebase/firestore';
import { RecursiveTree } from '../components/RecursiveTree';
import { Node, NodesType } from '../types/node';
import { AddListType } from '../types/addListType';
import { DeleteListType } from '../types/deleteListType';
import { UpdateListType } from '../types/updateListType';
import { UserContext } from '../context/UserContext';
import { db } from '../libs/Firebase';
import Loading from '../components/Loading';

function Nodes() {
  const { user, nodeList } = useContext(UserContext);
  const [nodes, setNodes] = useState<Node[]>();
  const [list, setList] = useState<NodesType[] | undefined[]>();
  const [loading, setLoading] = useState(true);
  const [scrollSize, setScrollSize] = useState({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  });

  const newUpdateNodes = async (data: Node[], id: string) => {
    setList((prevState) => prevState.map((obj: NodesType) => (obj.id === id
      ? {
        id: obj.id,
        nodes: data,
      }
      : obj)));
    const nodesDocumentRef = doc(db, 'users', user.id, 'nodeList', id);
    await updateDoc(nodesDocumentRef, {
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
    nodeListId: string,
    items: Node[],
    text: string,
    color: string,
    size: string,
    parentId: number,
    x: number,
    y: number,
  ): void => {
    const newId = findUniqueId(items);
    const newNodeData = {
      id: newId,
      text,
      color,
      size,
      parentId,
      x,
      y,
    };
    const copyArray = items.slice();
    copyArray.push(newNodeData);
    newUpdateNodes(copyArray, nodeListId);
  };

  const deleteList: DeleteListType = (
    items: Node[],
    nodeListId: string,
    id: number,
    parentId: number,
  ) => {
    const copyArray = items.slice();
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
    newUpdateNodes(newArray, nodeListId);
  };

  const updateList: UpdateListType = (
    items: Node[],
    nodeListId: string,
    id: number,
    text: string,
    color: string,
    size: string,
    parentId: number,
    x: number,
    y: number,
    flag: 'drag' | 'drop',
  ) => {
    const copyArray = items.slice();
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
    if (flag === 'drag') {
      setList((prevState) => prevState.map((obj: NodesType) => (obj.id === nodeListId
        ? {
          id: obj.id,
          nodes: newArray,
        }
        : obj)));
    }
    if (flag === 'drop') newUpdateNodes(newArray, nodeListId);
  };

  const clickAddButton = async () => {
    const data = {
      id: '',
      nodes: [
        {
          text: 'new node',
          id: 1,
          parentId: 0,
          size: 'size',
          color: 'color',
          x: 100,
          y: 100,
        },
      ],
    };
    const collectionRef = collection(db, 'users', user.id, 'nodeList');
    const docRef = await addDoc(collectionRef, data);
    await updateDoc(doc(db, 'users', user.id, 'nodeList', docRef.id), {
      id: docRef.id,
    });
    data.id = docRef.id;
    setList([...list, data]);
  };

  useEffect(() => {
    if (user && nodeList) {
      setLoading(false);
      setNodes(user.nodes);
      setList(nodeList);
    }
  }, [nodeList, user]);

  useEffect(() => {
    setScrollSize({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
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
      // h={scrollSize.height}
    >
      <Stack>
        <Button width="150px" onClick={() => clickAddButton()}>Create New Node</Button>
        {list
          && (list as NodesType[]).map(({ id, nodes: items }) => (
            <RecursiveTree
              key={id}
              list={items}
              nodeListId={id}
              rootId={0}
              addList={addList}
              deleteList={deleteList}
              updateList={updateList}
              parentLoc={{
                x: 0,
                y: 0,
              }}
            />
          ))}
      </Stack>
    </Box>
  );
}

export default Nodes;
