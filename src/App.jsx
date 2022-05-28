import Home from "./Home"
import Install from "./components/Install"

function App() {
  if(window.ethereum) {
    return <Home />;
  }
  else {
    return <Install />;
  }
}

export default App
