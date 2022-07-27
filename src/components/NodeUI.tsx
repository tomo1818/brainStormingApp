/* eslint-disable object-curly-newline */
import React, { useState, useRef } from 'react';
import {
  Box,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import Draggable, { DraggableEvent } from 'react-draggable';
import { Node } from '../types/node';
import { AddListType } from '../types/addListType';
import { DeleteListType } from '../types/deleteListType';
import { UpdateListType } from '../types/updateListType';

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

  // // データの更新が増えすぎるのでドロップ時に実行する方が良い
  // // ドラッグ時の移動が遅くなっていたのはこの処理が重すぎたからだと思います。
  // // const onDrag = (e: DraggableEvent, data: DraggableData) => {
  // //   setCurrentPosition({
  // //     xRate: data.lastX, yRate: data.lastY,
  // //   });
  // // };

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
    >
      <Box
        borderRadius="full"
        position="absolute"
        borderWidth="1px"
        p={0}
        m={0}
        color="black"
        background="blue.100"
        zIndex="1"
        width="140px"
      >
        <div ref={NodeRef}>
          <span>{item.id}</span>
          <span>
            x:
            {currentPosition.xRate}
            y:
            {currentPosition.yRate}
          </span>
          <Input
            borderColor="transparent"
            value={text}
            onChange={(e) => changeText(e.target.value)}
            onBlur={() => updateText(item)}
          />
          <IconButton
            borderRadius="full"
            aria-label="Search database"
            icon={<AddIcon />}
            onClick={clickAddButton}
          />
          <IconButton
            borderRadius="full"
            aria-label="Search database"
            icon={<CloseIcon />}
            onClick={clickDeleteButton}
          />
        </div>
      </Box>
    </Draggable>
  );
}
