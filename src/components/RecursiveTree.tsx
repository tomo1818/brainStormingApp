import React from 'react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { NodeUI } from './NodeUI';
import { Node } from '../types/node';
import { AddListType } from '../types/addListType';
import { DeleteListType } from '../types/deleteListType';
import { UpdateListType } from '../types/updateListType';

type Props = {
  list: Node[];
  rootId: number;
  addList: AddListType;
  deleteList: DeleteListType;
  updateList: UpdateListType;
};

export function RecursiveTree({ list, rootId, addList, deleteList, updateList }: Props) {
  const targetList = list.filter((item) => item.parentId === rootId);
  return (
    <Stack>
      <HStack>
        {targetList.map((item) => (
          <div key={item.id}>
            <NodeUI item={item} addList={addList} deleteList={deleteList} updateList={updateList} />
            {list.find((l) => l.parentId === item.id) && (
              <RecursiveTree
                list={list}
                rootId={item.id}
                addList={addList}
                deleteList={deleteList}
                updateList={updateList}
              />
            )}
          </div>
        ))}
      </HStack>
    </Stack>
  );
}
