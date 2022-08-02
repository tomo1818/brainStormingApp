export type UpdateListType = (
  id: number,
  text: string,
  color: string,
  size: string,
  parentId: number,
  x: number,
  y: number,
  flag: ('drag'|'drop')
) => void;
