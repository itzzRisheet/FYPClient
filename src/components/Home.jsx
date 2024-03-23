import { useEffect } from "react";
import LoginCard from "../elements/loginCard";
import RegisterCard from "../elements/RegisterCard";
import { localStore } from "../store/store";

const Home = () => {
  const { showLoginPage } = localStore();

  useEffect(() => {
    console.log(showLoginPage);
  }, []);

  return (
    <div className="main w-screen relative">
      <div className="absolute top snap-mandatory snap-y">
        <div className="heroBG absolute top-0 left-0 h-[100vh] w-[100vw] "></div>
        <div className="snap-start min-h-screen w-screen flex flex-col gap-10 items-center justify-center ">
          {showLoginPage ? <LoginCard /> : <RegisterCard />}
        </div>
        <div className="min-h-screen snap-start bg-gray-400 w-screen"></div>
        <div className="min-h-screen snap-start bg-gray-500 w-screen"></div>
        <div className="min-h-screen snap-start bg-gray-700 w-screen"></div>
        <div className="min-h-screen snap-start bg-gray-900 w-screen"></div>
      </div>
    </div>
  );
};

export default Home;
