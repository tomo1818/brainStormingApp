import React from 'react';
import { Box, Input, Stack, HStack, VStack, Editable, EditableInput, EditableTextarea, EditablePreview, IconButton } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Node, addListType, deleteListType } from '../types/node';

export function NodeUI({ item, addList, deleteList }:
  {item: Node, addList: addListType, deleteList: deleteListType}) {
  const clickAddButton = () => {
    addList('addSample', '', '', item.id);
  };
  const clickDeleteButton = () => {
    console.log(item.id);
    console.log(item.parentId);
    deleteList(item.id, item.parentId);
  };

  return (
    <Box bg="tomato" w="100%" p={4} m={0} color="white">
      <span>
        #
        {item.id}
      </span>
      {item.text}
      <Editable defaultValue="Take some chakra">
        <EditablePreview />
        <EditableInput />
      </Editable>
      <IconButton
        aria-label="Search database"
        icon={<AddIcon />}
        onClick={clickAddButton}
      />
      <IconButton
        aria-label="Search database"
        icon={<CloseIcon />}
        onClick={clickDeleteButton}
      />
    </Box>
  );
}
