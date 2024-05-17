import { BrowserRouter, Routes, Route } from "react-router-dom";


import Header from "./components/Header";
import Footer from "./components/Footer";

import CreateSchedul from "./pages/CreateSchedul";
import MySchedul from "./pages/MySchedul";
import UpdateWorkout from "./pages/UpdateWorkout";
import SCreateSchedul from "./pages/ScreateSchedule";
import Shareschedul from "./pages/Shareschedul";

import ShareupdateS from "./pages/ShareupdateS";
import ShareoneSchudul from "./pages/ShareoneSchudul";






export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
       
        <Route path="/createschedul" element={<CreateSchedul/>} />
        <Route path="/allshareschedul" element={<Shareschedul/>} />
        <Route path="/share/:idId" element={<ShareoneSchudul/>} />
        <Route path="/update/:workkId" element={<ShareupdateS/>} />
        <Route path="/createshare" element={<SCreateSchedul/>} />
        <Route path="/" element={<MySchedul/>} />
        <Route path="/updateworkout/:workId" element={<UpdateWorkout/>} />
       
      

        

       
         
        
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
