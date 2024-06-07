import { useNavigate } from "react-router-dom";
import { AdminIcon, TransactionIcon, UserIcon, LogoutIcon } from "../../assets";
import chatbot from "../../assets/images/chat-bot-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { setSuccess } from "../../features/system/systemSlice";
import toast from "react-hot-toast";

const styles = {
  active:
    "w-[190px] 2xl:w-[256px] h-[64px] rounded-[8px] bg-[#1C1C1D] flex pl-10 items-center space-x-6 cursor-pointer   ",
  inActive:
    "w-[190px] 2xl:w-[256px] h-[64px]  flex  items-center pl-10 space-x-6 hover:bg-[#1c1c1d] cursor-pointer",
};

export let isAuthenticated: boolean = false;

const Sidebar = ({ current }: { current: number }) => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [isAuthenticated, setISAuthenticated] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    dispatch(logoutUser({ access_token: auth?.access_token }));
    setDisabled(false);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    navigate("/login");
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    navigate("/signup");
  };

  useEffect(() => {
    if (localStorage.getItem("operation_status")=='success') {
      toast.success("ユーザーが脱退した。");
      setISAuthenticated(false);
      localStorage.setItem("operation_status", "none");
    }
  }, [auth])

  useEffect(() => {
    if (isAuthenticated) {
      
    } else {

    }
  }, [isAuthenticated])

  useEffect(() => {
    if (auth?.userData?.username) {
      setISAuthenticated(true);
    } else {
      setISAuthenticated(false);
    }
  }, [])


  const navigate = useNavigate();
  return (
    <div className="w-full fixed top-0 left-0 bottom-0 h-screen flex flex-col max-w-[250px] 2xl:max-w-[320px]   bg-[#202020] flow-hide  ">
      <div className="w-full flex flex-col items-center relative h-screen">
        <div className="mt-12 flex justify-center">
          {/* <h1 className="text-white">YOUR LOGO HERE</h1> */}
          <img src={chatbot} alt="チャットボット" className="w-20 h-20" />
        </div>
        <div className="flex flex-col items-center my-[20px]">
            <p className="text-white text-base font-bold">{auth?.userData?.username}</p>
        </div>

        <div className="absolute bottom-[120px] left-0 right-0">
          {isAuthenticated ? (
            <div
              className=" w-[256px] h-[64px]  flex  items-center pl-10 space-x-6 mx-auto cursor-pointer"
              onClick={handleLogout}
            >
              <LogoutIcon />
              <p className="text-[#DA3F51] font-medium text-base ">
                ログアウト
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center align-middle px-auto">
              <div className="p-5">
                <Button
                  className="mx-auto"
                  width={20}
                  name="ログイン"
                  onClick={handleLogin}
                >
                  ログイン
                </Button>
              </div>
              <div className="p-5">
                <Button
                  className="mx-auto"
                  width={20}
                  name="サインアップ"
                  onClick={handleSignup}
                >
                  サインアップ
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
