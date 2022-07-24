import React from 'react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { NodeUI } from './NodeUI';
import { Node } from '../types/node';
import { AddListType } from '../types/addListType';
import { DeleteListType } from '../types/deleteListType';
import { UpdateListType } from '../types/updateListType';
import { Arrow } from './Arrow';
import { Point } from '../types/twoPoint';

type Props = {
  list: Node[];
  rootId: number;
  addList: AddListType;
  deleteList: DeleteListType;
  updateList: UpdateListType;
  parentLoc: Point;
};

export function RecursiveTree({ list, rootId, addList, deleteList, updateList, parentLoc }: Props) {
  const targetList = list.filter((item) => item.parentId === rootId);
  return (
    <Stack>
      <HStack>
        {targetList.map((item) => (
          <div key={item.id}>
            <NodeUI item={item} addList={addList} deleteList={deleteList} updateList={updateList} />
            {parentLoc.x === 0 && parentLoc.y === 0
              ? ('') : (
                <Arrow
                  startPoint={{
                    x: parentLoc.x + 70, y: parentLoc.y + 70,
                  }}
                  endPoint={{
                    x: item.x + 70, y: item.y + 70,
                  }}
                />
              )}
            {list.find((l) => l.parentId === item.id) && (
              <RecursiveTree
                list={list}
                rootId={item.id}
                addList={addList}
                deleteList={deleteList}
                updateList={updateList}
                parentLoc={{
                  x: item.x, y: item.y,
                }}
              />
            )}
          </div>
        ))}
      </HStack>
    </Stack>
  );
}
