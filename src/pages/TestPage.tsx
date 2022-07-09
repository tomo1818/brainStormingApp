import React,{useState} from 'react';
import {RecursiveTree} from '../components/RecursiveTree';
import { Box, Input , Stack,HStack} from '@chakra-ui/react'


function TestPage() {

  const [list,setList]=useState([
    { id: 1, text: "at 01", color:"",size:"",parentId: 0 },
    { id: 2, text: "at 02", color:"",size:"",parentId: 1 },
    { id: 3, text: "at 03", color:"",size:"",parentId: 1 },
    { id: 4, text: "at 04", color:"",size:"",parentId: 3 },
    { id: 5, text: "at 05", color:"",size:"",parentId: 3 },
    { id: 6, text: "at 06", color:"",size:"",parentId: 3 },
    { id: 7, text: "at 07", color:"",size:"",parentId: 3 },
   ])
  
  const findUniqueId =(list)=>{
    let maxId:number=0
    list.map((item)=>{
      if(item.id>maxId){
        maxId=item.id
      }
    })
    return maxId+1
  }

  const addList=(text,color,size,parentId) => {
    const newId=findUniqueId(list)
    const newNodeData={ 
      id: newId, 
      text: text, 
      color:color,
      size:size,
      parentId: parentId 
    }
    const copyArray = list.slice()
    copyArray.push(newNodeData)
    setList(copyArray)
  }

  const deleteList=(id,parentId) => {
    console.log("deleteList")
    const copyArray = list.slice()
   
  }

  

  return (
    <div className="App">
      <h1>MindMap Page</h1>
      <Stack>
      <RecursiveTree list={list} rootId={0} addList={addList} deleteList={deleteList}/>
      </Stack>

    </div>
  );
}

export default TestPage;