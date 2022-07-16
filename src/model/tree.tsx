export class Node {
	id: string;
	text: string;
	color: string;
	size: string;
	children: Node[];
	father: Node;
	constructor (id: string,text: string,color: string,size: string,children: Node[],father: Node) {
		this.id = id;
		this.text = text;
		this.color = color;
		this.size = size;
		this.children = children;
		this.father = father;
	}

	add() { /*子ノードの作成*/
		let id: string;
		id = this.id + String(this.children.length);
		const child = new Node(id,"","","",[],this);
		this.children.push(child);
	}

	delete() {
		const father: Node = this.father;
		const index: number = Number(this.id.slice(-1));
		father.children.splice(index,1);
	}
}