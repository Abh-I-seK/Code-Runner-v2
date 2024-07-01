import Link from "next/link"
import { Suspense } from "react"
import Table from "./Table"
export const dynamic = "force-dynamic";
export default function Dashboard(){
    return(
        <div>
            <div className="text-center">
            <Link href="/" className="text-gray-900 font-semi bold my-10 bg-[#f5ca66c0] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-sm rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2">
                Go Back
            </Link>
            </div>
            <Suspense fallback={<Skeleton/>}>
                <Table/>
            </Suspense>
        </div>
    )
}

function Skeleton(){
    return(
    <div role="status" className="animate-pulse flex flex-col items-center justify-center gap-4">
        <div className="h-5 mx-auto bg-gray-200 rounded-full dark:bg-gray-400 w-3/4"></div>
        <div className="h-3 mx-auto bg-gray-200 rounded-full dark:bg-gray-400 w-3/4"></div>
        <div className="h-3 mx-auto bg-gray-200 rounded-full dark:bg-gray-400 w-3/5"></div>
        <span className="sr-only">Loading...</span>
    </div>
    )
}