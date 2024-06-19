import React, { useState, ChangeEvent } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import FileUpload from "../fileUpload/FIleUpload";

const LearningFile: React.FC = () => {

  const handleStartLearning = () => {
    // Handle the start learning action
    console.log("Starting learning with items:", items);
  };
  
  return (
    <div className="h-[670px]">
      <div className="p-[37px] h-full">
        <div
          className="bg-[#E9E9E9]  px-auto flex justify-center p-[10px] overflow-auto"
          style={{ height: "calc(100vh - 330px)" }}
        >
          <FileUpload />
        </div>
      </div>
      <div className="flex justify-center pt-[16px] pb-[16px]">
        <button
          type="button"
          onClick={handleStartLearning}
          className="mt-4 p-2 bg-[#3E3E3E] text-white rounded-[30px] w-[198px] text-md tracking-widest"
        >
          学習開始
        </button>
      </div>
    </div>
  );
};

export default LearningFile;
