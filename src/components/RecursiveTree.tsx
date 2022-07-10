import React from 'react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { NodeUI } from './NodeUI';
import { Node, addListType, deleteListType } from '../types/node';

export function RecursiveTree({ list, rootId, addList, deleteList }:
  {list: Node[], rootId: number, addList: addListType, deleteList: deleteListType}) {
  const targetList = list.filter((item) => item.parentId === rootId);
  return (
    <Stack>
      <HStack>
        {targetList.map((item) => (
          <div key={item.id}>
            <NodeUI item={item} addList={addList} deleteList={deleteList} />
            {list.find((l) => l.parentId === item.id) && (
              <RecursiveTree
                list={list}
                rootId={item.id}
                addList={addList}
                deleteList={deleteList}
              />
            )}
          </div>
        ))}
      </HStack>
    </Stack>
  );
}
