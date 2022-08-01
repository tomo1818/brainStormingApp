import { Node } from './node';

export type AddListType = (
  nodeListId: string,
  items: Node[],
  text: string,
  color: string,
  size: string,
  parentId: number,
  x: number,
  y: number,
) => void
