import React from 'react';
import { Box, Editable, EditableInput, EditableTextarea, EditablePreview, IconButton } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Node } from '../types/node';
import { AddListType } from '../types/addListType';
import { DeleteListType } from '../types/deleteListType';

type Props = {
  item: Node;
  addList: AddListType;
  deleteList: DeleteListType;
};

export function NodeUI({ item, addList, deleteList }: Props) {
  const clickAddButton = () => {
    addList('addSample', '', '', item.id);
  };
  const clickDeleteButton = () => {
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
