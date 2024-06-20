import { useEffect, useState } from "react";
import LearningURL from "../windows/LearningURL";
import LearningFile from "../windows/LearningFile";
import LearningHandInput from "../windows/LearningHandInput";

interface URLItem {
  url: string;
  title: string;
  remarks: string;
}

interface HandInputItem {
  title: string;
  content: string;
}

interface UploadStatus {
  fileName: string;
  fileSize: number; // Size in KB
  status: "inProgress" | "failure" | "success";
  progress: number; // Percentage
  remainingTime: number; // Seconds
}

const Learning = () => {
  const [currentWindow, setCurrentWindow] = useState("URL");

  // State for LearningURL component
  const [urlItems, setUrlItems] = useState<URLItem[]>([
    { url: "", title: "", remarks: "" },
  ]);

  // State for LearningFile component
  const [fileItems, setFileItems] = useState<File[]>([]);
  const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);

  // State for LearningHandInput component
  const [handInputItem, setHandInputItem] = useState<HandInputItem>({
    title: "",
    content: "",
  });

  const renderWindow = (windowName: string) => {
    switch (windowName) {
      case "URL":
        return <LearningURL items={urlItems} setItems={setUrlItems} />;
      case "FileUpload":
        return (
          <LearningFile
            files={fileItems}
            setFiles={setFileItems}
            uploadStatuses={uploadStatuses}
            setUploadStatuses={setUploadStatuses}
          />
        );
      case "HandInput":
        return (
          <LearningHandInput item={handInputItem} setItem={setHandInputItem} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="pl-5 text-xl font-bold h-full max-h-full flex flex-col">
      <h1 className="">学習させる</h1>
      <div className="flex flex-row mt-[15px] mb-[14px] space-x-[31px]">
        <div className="w-[233px]">
          <button
            className={`flex w-full justify-center rounded-md bg-[#D9D9D9] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B0B0B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-black`}
            name="URL"
            key="URL"
            onClick={() => setCurrentWindow("URL")}
          >
            URL
          </button>
        </div>
        <div className="w-[233px]">
          <button
            className={`flex w-full justify-center rounded-md bg-[#D9D9D9] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B0B0B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-black`}
            width={20}
            name="ファイルアップロード"
            key="FileUpload"
            onClick={() => setCurrentWindow("FileUpload")}
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
            onClick={() => setCurrentWindow("HandInput")}
          >
            手入力
          </button>
        </div>
      </div>
      <div className="mr-[17px] border border-gray-400 flex flex-col max-h-[70vh] h-full">
        {renderWindow(currentWindow)}
      </div>
    </div>
  );
};

export default Learning;
