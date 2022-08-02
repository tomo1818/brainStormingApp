import { Node } from './node';

export type UpdateListType = (
  items: Node[],
  nodeListId: string,
  id: number,
  text: string,
  color: string,
  size: string,
  parentId: number,
  x: number,
  y: number,
  flag: ('drag'|'drop')
) => void;
