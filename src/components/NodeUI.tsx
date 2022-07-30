/* eslint-disable object-curly-newline */
import React, { useState, useRef } from 'react';
import {
  Box,
  ButtonGroup,
  IconButton,
  Input,
} from '@chakra-ui/react';
import Draggable, { DraggableEvent } from 'react-draggable';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Node } from '../types/node';
import { AddListType } from '../types/addListType';
import { DeleteListType } from '../types/deleteListType';
import { UpdateListType } from '../types/updateListType';
import { ColorSelector } from './ColorSelector';

type Props = {
  item: Node;
  addList: AddListType;
  deleteList: DeleteListType;
  updateList: UpdateListType;
};

type Position = {
  xRate: number;
  yRate: number;
};
type DraggableData = {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
};

type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;

export function NodeUI({ item, addList, deleteList, updateList }: Props) {
  const [text, setText] = useState(item.text);
  const changeText = (value: string) => {
    setText(value);
  };
  const updateText = (node: Node) => {
    updateList(
      node.id,
      text,
      node.color,
      node.size,
      node.parentId,
      node.x,
      node.y,
      'drop',
    );
  };
  const clickAddButton = () => {
    addList('addSample', '', '', item.id, item.x + 100, item.y + 100);
  };
  const clickDeleteButton = () => {
    deleteList(item.id, item.parentId);
  };

  const [currentPosition, setCurrentPosition] = useState<Position>({
    xRate: item.x,
    yRate: item.y,
  });

  const [boxColor, setBoxColor] = useState('blue.100');

  // // データの更新が増えすぎるのでドロップ時に実行する方が良い
  const onDrag = (e: DraggableEvent, data: DraggableData) => {
    setCurrentPosition({
      xRate: data.x, yRate: data.y,
    });
    updateList(
      item.id,
      item.text,
      item.color,
      item.size,
      item.parentId,
      data.x,
      data.y,
      'drag',
    );
  };

  // ドロップ時に更新を行うことで処理を軽くする
  const onDrop = (e: DraggableEvent, data: DraggableData) => {
    // ローカルでの更新
    setCurrentPosition({
      xRate: data.x,
      yRate: data.y,
    });
    // データベースでの更新
    updateList(
      item.id,
      item.text,
      item.color,
      item.size,
      item.parentId,
      data.x,
      data.y,
      'drop',
    );
  };

  const NodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      position={{
        x: currentPosition.xRate,
        y: currentPosition.yRate,
      }}
      onStop={onDrop}
      onDrag={onDrag}
    >

      <Box
        borderRadius="full"
        position="absolute"
        borderWidth="5px"
        p={0}
        m={0}
        color="black"
        background={boxColor}
        zIndex="1"
        width="140px"
        height="140px"
      >
        <div ref={NodeRef}>
          <Input
            borderColor="transparent"
            value={text}
            onChange={(e) => changeText(e.target.value)}
            onBlur={() => updateText(item)}
          />
          <ButtonGroup size="sm">
            <ColorSelector setBoxColor={setBoxColor} />
            <IconButton
              icon={<AddIcon />}
              onClick={clickAddButton}
              aria-label=""
              height="22px"
              width="22px"
              padding={0}
              minWidth="unset"
              borderRadius={3}
            />
            <IconButton
              icon={<CloseIcon />}
              onClick={clickDeleteButton}
              aria-label=""
              height="22px"
              width="22px"
              padding={0}
              minWidth="unset"
              borderRadius={3}
            />
          </ButtonGroup>

        </div>
      </Box>

    </Draggable>
  );
}
