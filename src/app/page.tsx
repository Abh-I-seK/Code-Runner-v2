'use client'
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { materialDark } from '@uiw/codemirror-theme-material';
import { createCode } from '@/server/action';
import { useFormStatus } from 'react-dom';

export default function Home() {
  const [value, setValue] = React.useState<string>("");
  const [inp , setInp] = React.useState<string>("");
  const [lang , setLang] = React.useState<string>("93");
  const [name , setName] = React.useState<string>("");
  const onChange = React.useCallback((val : string, viewUpdate : any) => {
      setValue(val);
  }, []);


  return (
    <main className="p-5">
      <form className="max-w-sm mx-auto" action={
        async()=>{
          const res = await createCode({username : name , srcCode : value , stdinp : inp , lang : lang });
          if(res === "Invalid data"){
            alert("Invalid data");
          }
        }}> 
        <div className="mb-5">
          <label className="block mb-2 text-md font-semibold tracking-wider text-gray-900 dark:text-white">Username</label>
          <input onChange={(e)=>{setName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc@example" required />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-md font-semibold tracking-wider text-gray-900 dark:text-white">Language</label>
          <select onChange={(e)=>{setLang(e.target.value); if(e.target.value == "91") {alert("Make Sure the Main Method is inside 'class Main' for JAVA")}}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={"93"}>
          <option value="91" >Java</option> 
          <option value="92">Python</option>
          <option value="93">Javascript</option>
          <option value="53">C++</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-md font-semibold tracking-wider text-gray-900 dark:text-white">Source Code</label>
          <CodeMirror value={value} height="200px" theme={materialDark} extensions={[java()]} onChange={onChange}/>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-md font-semibold tracking-wider text-gray-900 dark:text-white">Standard Input</label>
          <textarea onChange={(e)=>{setInp(e.target.value);}} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paste Your Inputs Here..." ></textarea>
        </div>
        <SubmitButton/>
      </form>
    </main>
  );
}

function SubmitButton(){
  const {pending} = useFormStatus();
  return(
    <button type='submit' className="px-5 py-2.5 w-full text-md font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {pending ? "Submitting..." : "Submit"}
    </button>
  )
}