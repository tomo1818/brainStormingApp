export class Node {
	id: String;
	children: Node[];
	father: Node;
	constructor (id: String,children: Node[],father: Node) {
		this.id = id;
		this.children = children;
		this.father = father;
	}

	add() {
		let id: String;
		id = this.id + String(this.children.length);
		const child = new Node(id,[],this);
		this.children.push(child);
	}

	delete() {
		const father: Node = this.father;
		const index: number = Number(this.id.slice(-1));
		father.children.splice(index,1);
	}
}

/*
export const tree: Node = {
	id: '(root)',
    children: [
      { id: 'node1', children: [
        { id: 'node1-1', children: []},
        { id: 'node1-2', children: []},
        { id: 'node1-3', children: [
          {id: 'node1-3-1', children: []},
          {id: 'node1-3-2', children: []},
          {id: 'node1-3-3', children: []},
        ]},
      ]},
      { id: 'node2', children: [
        { id: 'node2-1', children: [
          {id: 'node2-1-1', children: []},
          {id: 'node2-1-2', children: []},
        ]},
        { id: 'node2-2', children: []},
      ]},
    ]};
*/


  