// frontend/src/components/PageComponents/LearningLog.tsx

import React, { useState, useEffect } from "react";
import { APIService } from "../../util/APIService";
import "../../assets/css/style.css";
import toast from "react-hot-toast";
import axios from "axios";
import { url } from "../../util/endpoints";

interface LearningLogData {
  id: string;
  title: string;
  type: "URL形式" | "ファイル形式" | "手入力形式";
  note?: string;
  learningDate: string;
}

const LearningLog: React.FC = () => {
  const [data, setData] = useState<LearningLogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the database or API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log(token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await APIService.get<LearningLogData[]>(
          "/learningLogs/",
          config
        );

        setData(response.data);
        toast.success("操作は正常に続行されました");
        setLoading(false);
      } catch (err) {
        toast.error("操作に失敗しました。");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  // Sort data by learningDate
  const sortedData = data.sort(
    (a, b) =>
      new Date(b.learningDate).getTime() - new Date(a.learningDate).getTime()
  );

  const handleEdit = async (id: string) => {
    const newTitle = prompt("新しいタイトルを入力してください");
    if (newTitle) {
      try {
        const token = localStorage.getItem("access_token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        await APIService.put(`/learningLogs/${id}`, { title: newTitle });
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, title: newTitle } : item
          )
        );
        toast.success("操作は正常に続行されました");
      } catch (err) {
        toast.error("編集に失敗しました");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("この項目を削除してもよろしいですか？")) {
      try {
        const token = localStorage.getItem("access_token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        await APIService.delete(`/learningLogs/${id}`, config);
        setData((prevData) => prevData.filter((item) => item.id !== id));
        toast.success("操作は正常に続行されました");
      } catch (err) {
        toast.error("削除に失敗しました");
      }
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col h-full max-h-full p-4">
      <h1 className="sticky top-0 z-20 mb-4 text-xl font-bold bg-white">
        学習ログ
      </h1>
      <div className="flex-grow overflow-y-auto table-container">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="bg-white border-0">
              <th className="p-2 border-gray-300"></th>
              <th className="p-2 text-left border-gray-300 w-30">タイトル</th>
              <th className="p-2 text-left border-gray-300 w-30">
                ファイル形式
              </th>
              <th className="p-2 text-left border-gray-300">備考</th>
              <th className="p-2 text-left border-gray-300">学習日</th>
              <th className="p-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((log, index) => (
              <tr key={index} className="bg-gray-100 border-gray-600">
                <td className="p-2 pl-0 text-center align-middle bg-white">
                  <input type="checkbox" className="w-3 h-3" />
                </td>
                <td
                  className="p-2 align-top border-t border-b border-l max-w-40 text-ellipsis"
                  title={log.title}
                >
                  {truncateString(log.title, 15)}
                </td>
                <td
                  className="w-32 p-2 underline align-top border-t border-b text-ellipsis"
                  title={log.type}
                >
                  {truncateString(log.type, 15)}
                </td>
                <td
                  className="max-w-[300px] p-2 align-top border-t border-b"
                  title={log.note}
                >
                  <p className="w-full " style={{ whiteSpace: "normal", wordWrap: "break-word"}}>
                    {log.type === "URL形式" || log.type === "手入力形式"
                      ? // ? truncateString(log.note || "", 30)
                        log.note
                      : ""}
                  </p>
                </td>
                <td
                  className="p-2 align-top border-t border-b w-36"
                  title={log.learningDate}
                >
                  {truncateString(log.learningDate, 20)}
                </td>
                <td className="p-2 align-top border-t border-b ">
                  <div className="flex justify-start align-top">
                    <button
                      className="w-6 h-6 mr-1 text-xs text-white bg-gray-600 rounded-full text-[10px]"
                      onClick={() => handleEdit(log.id)}
                    >
                      編集
                    </button>
                    <button
                      className="w-6 h-6 text-xs text-white bg-red-600 rounded-full text-[10px]"
                      onClick={() => handleDelete(log.id)}
                    >
                      削除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LearningLog;
