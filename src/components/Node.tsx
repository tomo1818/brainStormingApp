import React from 'react';
import { Box, Input , Stack,HStack,VStack} from '@chakra-ui/react'
import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
  } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import {AddIcon,CloseIcon} from '@chakra-ui/icons'

export const Node = (props) => {

    const clickAddButton=() => {
        props.addList("addSample","","",props.item.id)
    }
    const clickDeleteButton=() => {
        
        console.log(props.item.id)
        console.log(props.item.parentId)
        props.deleteList(props.item.id,props.item.parentId)
    }

  return (
      <>
        <Box bg="tomato" w="100%" p={4} m={0} color="white">
            <span>#{props.item.id}</span> {props.item.name}
            <Editable defaultValue="Take some chakra">
            <EditablePreview />
            <EditableInput />
            </Editable>
            <IconButton aria-label="Search database" icon={<AddIcon />} onClick={clickAddButton} />
            <IconButton aria-label="Search database" icon={<CloseIcon />} onClick={clickDeleteButton}/>
        </Box>

        
      </>
 
  )
}