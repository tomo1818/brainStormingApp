export type Node = {
    id: number;
    text: string;
    color: string;
    size: string;
    parentId: number;
}
export type addListType = (text: string, color: string, size: string, parentId: number) => void
export type deleteListType = (id: number, parentId: number) => void
