import "./App.css";
import ForYou from "./pages/ForYou/ForYou";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Sidebar from "./components/Main/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import ModalPost from "./components/ModalPost/ModalPost";
import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginModal from "./components/Login/LoginModal";
import { TiktokContext } from "./tiktok-context";
import Following from "./pages/Following/Following";
import Signin from "./components/Signin/Signin";

function App() {
  const { logInmodal,signinmodal} = useContext(TiktokContext);
  useEffect(() => {
    if (window.location.href == "http://localhost:3006") {
      window.location.replace("http://localhost:3006/foryou");
    }
  }, []);
 

  return (
    <BrowserRouter>
      <div className="App position-relative">
        <header className="nav justify-content-between bg-color align-items-center px-3 border-bottom border-dark position-fixed w-100" style={{top:0}}>
          <Navbar />
        </header>
        <main className="text-white" style={{paddingTop:"64px"}}>
          <div className="row w-100 m-0">
            <section className="col-lg-2 px-4 sidebar">
              <Sidebar />
            </section>
            <section className="col-lg-10 p-0  overflow-y-scroll" style={{height:"92dvh"}}>
              <Routes>
                <Route path="/" element={<ForYou />} />
                <Route path="/:username" element={<Profile />} />
                <Route path="/following" element={<Following />} />
                <Route path="/search/:search" element={<Search />} />
                
              </Routes>
            </section>
          </div>
          {logInmodal && <LoginModal />}
          {signinmodal && <Signin />}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
