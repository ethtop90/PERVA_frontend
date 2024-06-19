import { useEffect, useState } from "react";
import { Button } from "../Button";
import { configureStore, current } from "@reduxjs/toolkit";
import LearningURL from "../windows/LearningURL";
import LearningFile from "../windows/LearningFile";
import LearningHandInput from "../windows/LearningHandInput";

const Learning = () => {
  const [currentWindow, setCurrentWindow] = useState("URL");

  const renderWindow = (windowName: string) => {
    switch (windowName) {
      case "URL":
        return <LearningURL />
      case "FileUpload":
        return <LearningFile />
      case "HandInput":
        return <LearningHandInput />
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(currentWindow);
  }, [currentWindow])

  return (
    <div className="pl-5 text-xl font-bold ">
      <h1 className="">学習させる</h1>
      <div className="flex flex-row mt-[15px] mb-[14px] space-x-[31px]">
        <div className="w-[233px]">
          <button
            className={`flex w-full justify-center rounded-md bg-[#D9D9D9] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B0B0B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-black`}
            name="URL"
            key="URL"
            onClick={(e) => setCurrentWindow("URL")}
          >
            URL
          </button>
        </div>
        <div className="w-[233px]">
          <button
            className={`flex w-full justify-center rounded-md bg-[#D9D9D9] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B0B0B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-black`}
            width={20}
            name="ファイルアップロード"
            key="FildUpload"
            onClick={(e) => setCurrentWindow("FileUpload")}
          >
            ファイルアップロード
          </button>
        </div>
        <div className="w-[233px]">
          <button
            className={`flex w-full justify-center rounded-md bg-[#D9D9D9] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B0B0B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-black`}
            width={20}
            name="手入力"
            key="HandInput"
            onClick={(e) => setCurrentWindow("HandInput")}
          >
            手入力
          </button>
        </div>
      </div>
      <div className="mr-[17px] border border-gray-400 ">
        {renderWindow(currentWindow)}
      </div>
    </div>
  );
};


export default Learning;
