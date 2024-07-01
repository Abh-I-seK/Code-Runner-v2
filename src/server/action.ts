"use server";
import { db } from "./db"; 
import { codesTable } from "./schema";
import { codeSchema } from "@/utils/ZodSchema";
import { options } from "@/utils/Judge0";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type formInput = {
  username : string,
  srcCode : string,
  stdinp : string,
  lang : string,
}

export async function createCode(data : formInput){
    const {username , srcCode , stdinp , lang} = data;
    if(srcCode.length <= 3){
        return "Invalid data";
    }
    const src_code = btoa(srcCode);
    const std_inp = btoa(stdinp);
    const rapidAPI = options(parseInt(lang) , src_code ,std_inp);
    const response = await axios.request(rapidAPI);
    
    const output : string = atob(response.data.stdout);
    const status : string = response.data.status.description;
    
    let language : string = "";
    if(lang === "91"){
        language = "Java"
    }else if(lang === "92"){
        language = "Python"
    }else if(lang === "93"){
        language = "Javascript";
    }else{
        language = "C++"
    }

    const dataToInsert = {
        username , srcCode , stdinp , lang :language , stdout : output , status
    }    
    const result = codeSchema.safeParse(dataToInsert);
    if(!result.success){
        return "Invalid data";
    }

    const code = await db.insert(codesTable).values(result.data);
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function getAllCodes(){
    const codes = await db.select().from(codesTable);
    return codes;
}

export async function getCodeByID(id : number){
    const code = await db.select().from(codesTable).where(eq(codesTable.id , id));
    return code[0];
}