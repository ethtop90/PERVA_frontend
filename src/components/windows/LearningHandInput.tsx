import React, { ChangeEvent } from "react";
import { APIService } from "../../util/APIService";
import toast from "react-hot-toast";

interface Item {
  title: string;
  content: string;
}

interface LearningHandInputProps {
  item: Item;
  setItem: React.Dispatch<React.SetStateAction<Item>>;
}

const LearningHandInput: React.FC<LearningHandInputProps> = ({
  item,
  setItem,
}) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleStartLearning = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await APIService.post(
        "/learningData/handinput",
        item,
        config
      );
      console.log("Response:", response.data);
      toast.success("操作は正常に続行されました");
    } catch (error) {
      console.error("Error starting learning:", error);
      toast.error("操作に失敗しました。");
    }
  };

  return (
    <div className="max-h-full h-full flex flex-col">
      <div className="pl-[33px] pb-[15px] pr-[68px] pt-[5px] h-full overflow-auto">
        <div className="flex items-center max-w-[1200px]">
          <div className="w-full">
            <div className="flex-1 my-2">
              <label className="block text-md text-gray-700">タイトル</label>
              <input
                type="text"
                name="title"
                placeholder="タイトルをご記入ください"
                value={item.title}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-5 text-sm"
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
          className="my-5 p-2 bg-[#3E3E3E] text-white rounded-[30px] w-[198px] text-md tracking-widest"
        >
          学習開始
        </button>
      </div>
    </div>
  );
};

export default LearningHandInput;
