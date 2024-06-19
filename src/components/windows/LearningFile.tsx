// src/components/windows/LearningFile.tsx
import React, { useState, ChangeEvent } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import FileUpload from "../fileUpload/FIleUpload";
import { APIService } from "../../util/APIService";

const LearningFile: React.FC = () => {

  const handleStartLearning = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const formData = new FormData();
      const files = document.querySelector('input[type="file"]').files;

      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }

      const response = await APIService.post(
        "/learningData/files",
        formData,
        config
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error starting learning:", error);
    }
  };

  return (
    <div className="max-h-full h-full flex flex-col">
      <div className="pt-[37px] px-[37px] h-full">
        <div className="bg-[#E9E9E9]  px-auto flex justify-center pb-10 overflow-auto">
          <FileUpload />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleStartLearning}
          className="mb-4 p-2 bg-[#3E3E3E] text-white rounded-[30px] w-[198px] text-md tracking-widest"
        >
          学習開始
        </button>
      </div>
    </div>
  );
};

export default LearningFile;
