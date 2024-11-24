"use client"
import { useState, useCallback } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { java } from "@codemirror/lang-java"
import { materialDark } from "@uiw/codemirror-theme-material"
import { createCode } from "@/server/action"
import { useFormStatus } from "react-dom"

export default function Home() {
  const [value, setValue] = useState<string>("")
  const [inp, setInp] = useState<string>("")
  const [lang, setLang] = useState<string>("93")
  const [name, setName] = useState<string>("")
  const onChange = useCallback((val: string, viewUpdate: any) => {
    setValue(val)
  }, [])

  async function onSubmit() {
    const res = await createCode({
      username: name,
      srcCode: value,
      stdinp: inp,
      lang: lang,
    })
    if (res === "Invalid data") {
      alert("Invalid data")
    }
  }

  return (
    <main className="p-5">
      <form
        className="mx-auto"
        action={onSubmit}
        onSubmit={async()=>{await onSubmit()}}
      >
        <div className="flex justify-center gap-10">
          <div className="mb-5">
            <label className="block mb-2 text-md font-semibold tracking-wider text-gray-900 dark:text-white text-center">
              Username
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value)
              }}
              className="bg-gray-700 text-white text-sm rounded-lg block w-full px-3 p-2.5 border border-gray-600"
              placeholder="abc@example"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-md font-semibold tracking-wider text-gray-900 dark:text-white text-center">
              Language
            </label>
            <select
              onChange={(e) => {
                setLang(e.target.value)
                if (e.target.value == "91") {
                  alert(
                    "Make Sure the Main Method is inside 'class Main' for JAVA"
                  )
                }
              }}
              className="bg-gray-700 text-white text-sm rounded-lg block w-full px-3 p-2.5 border border-gray-600" 
              defaultValue={"93"}
            >
              <option value="91">Java</option>
              <option value="92">Python</option>
              <option value="93">Javascript</option>
              <option value="53">C++</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-8">
          <div className="mb-5 col-span-6">
            <label className="block mb-2 text-md font-semibold tracking-wider text-white">
              Source Code
            </label>
            <CodeMirror
              value={value}
              height="450px"
              theme={materialDark}
              extensions={[java()]}
              onChange={onChange}
            />
          </div>
          <div className="mb-5 col-span-2">
            <label className="block mb-2 text-md font-semibold tracking-wider text-white">
              Input
            </label>
            <textarea
              onChange={(e) => {
                setInp(e.target.value)
              }}
              rows={4}
              className="h-[450px] w-full text-sm text-gray-100 bg-gray-700 rounded-lg"
              placeholder="Inputs..."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
        <SubmitButton />
        </div>
      </form>
    </main>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="px-5 py-2.5 w-40 m-2 text-md font-medium text-white bg-blue-700 rounded-lg" 
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  )
}
