export type Node = {
  id: number;
  text: string;
  color: string;
  size: string;
  parentId: number;
  x :number;
  y :number;
};

export type NodesType = {
  id: string;
  nodes: Node[];
};
