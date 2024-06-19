import { Content } from "antd/es/layout/layout";
import { title } from "process";
import React, { useState, ChangeEvent } from "react";
import { Interface } from "readline";

interface Item {
  title: string;
  content: string;
}

const LearningHandInput: React.FC = () => {
  const [item, setItem] = useState<Item>({ title: "", content: "" });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleStartLearning = () => {
    // Handle the start learning action
    console.log("Starting learning with items:");
  };

  return (
    <div className="pt-[24px] h-[670px]">
      <div className="pl-[33px] pb-[15px] pr-[68px] pt-[5px] h-full overflow-auto">
        <div className="flex items-center  max-w-[1200px]">
          <div className="w-full">
            <div className="flex-1 my-2">
              <label className="block text-md text-gray-700">タイトル</label>
              <input
                type="text"
                name="title"
                placeholder="タイトルをご記入ください"
                value={item.title}
                onChange={(e) => handleInputChange(e)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div className="flex-1 my-2">
              <label className="block text-md font-bold text-gray-700">
                内容
              </label>
              <textarea
                name="content"
                placeholder="こちらに学習させたい内容を記述ください"
                value={item.content}
                onChange={(e) => handleInputChange(e)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-5 text-sm "
                rows={15}
              />
            </div>
          </div>
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

export default LearningHandInput;
