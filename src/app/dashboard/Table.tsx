'use server';
import React from "react"
import { Redis } from '@upstash/redis'
import { SelectCode } from "@/server/schema";
import { getAllCodes, getCodeByID } from "@/server/action";

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_REDIS_URL,
  token: process.env.NEXT_PUBLIC_REDIS_TOKEN,
})

function Row(props : {username : string , language : string , stdinput : string , stdoutput : string , created : string , sourceCode : string , status : string}){

    return(
        <tr className="bg-white m-1 border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {props.username}
            </th>
            <td className="px-6 py-4 text-center">
                {props.language}
            </td>
            <td className="px-6 py-4 text-center">
                {props.stdinput}
            </td>
            <td className="px-6 py-4 text-center">
                {props.status.charAt(0) == 'A' ? props.stdoutput : ""}  
            </td>
            <td className="px-6 py-4 text-center">
                {convertUTCToIST(props.created)}
            </td>
            <td className="px-6 py-4 text-center">
                {First100(props.sourceCode)}
            </td>
            {props.status.charAt(0) == 'A' ? <td className="px-6 py-4 text-green-500 text-center">{props.status}</td> :  <td className="px-6 py-4 text-red-500 text-center">{props.status}</td>}  
            
        </tr>
    )
}



export default async function Table(){
    let codes : SelectCode[]|null = null; 
    const cahcedCodes : SelectCode[] | null = await redis.get("codes");
    if(cahcedCodes){
        let mostRecentID : number= cahcedCodes[0].id;
        let a : SelectCode[] = cahcedCodes.reverse();
        
        while(true){
            let cur = await getCodeByID(++mostRecentID);
            if(cur){
                a.push(cur);
            }else{
                break;
            }
        }
        a = a.reverse();
        if(a.length > 100){
            a = a.slice(0 , 100);
        }
        codes = a;
        await redis.set("codes" , a);
    }else{
        const all = await getAllCodes();
        all.reverse();
        codes = all;
        await redis.set("codes" , codes);
    }

    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Language
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            std_inp
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            std_out
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Source Code
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {codes.map((a : SelectCode)=>{
                        return <Row key={a.id} username={a.username} language={a.lang} stdinput={a.stdinp} stdoutput={a.stdout} created={a.created+""} status={a.status} sourceCode={a.srcCode}></Row>
                    })}
                </tbody>
            </table>
        </div>
    )
}

function convertUTCToIST(utcDateString : string) {
  const utcDate = new Date(utcDateString);
  const istOffset = 5.5; 
  const istDate = new Date(utcDate.getTime() + istOffset * 60 * 60 * 1000);
  const year = istDate.getFullYear();
  const month = istDate.getMonth() + 1;
  const date = istDate.getDate();
  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const seconds = istDate.getSeconds();

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}
  
function First100(str : string){
return str.substring(0,101);
}