import React from 'react';
import {RecursiveTree} from '../components/RecursiveTree';

function TestPage() {

  const list = [
    { id: 1, text: 'at 01', color:"",size:"",parentId: 0 },
    { id: 2, text: 'at 02', color:"",size:"",parentId: 1 },
    { id: 3, text: 'at 03', color:"",size:"",parentId: 1 },
    { id: 4, text: 'at 04', color:"",size:"",parentId: 3 },
    { id: 5, text: 'at 05', color:"",size:"",parentId: 3 },
    { id: 6, text: 'at 06', color:"",size:"",parentId: 3 },
   ];

  return (
    <div className="App">
      <h1>MindMap Page</h1>
      <RecursiveTree list={list} rootId={0}/>
    </div>
  );
}

export default TestPage;