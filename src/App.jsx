import Home from "./Home"
import Install from "./components/Install"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Transfer from "./Transfer";

function App() {
  if(window.ethereum) {
    return (
      <div className="bg-gradient-to-tr from-black to-[#411b87] min-h-screen">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={ <Navigate to="/mint" />} />
            <Route path="/mint" element={ <Home /> } />
            <Route path="/transfer" element={ <Transfer /> } />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  else {
    return <Install />;
  }
}

export default App
