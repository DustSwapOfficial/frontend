import "./App.css";
import "./assets/css/font.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from "axios";
import Layout from "./components/layout";
import Landing from "./pages/landing";
import Trade from "./pages/trade";
import Pools from "./pages/pools";
import PoolDetails from "./pages/pool-details";
import Positions from "./pages/positions";
import Earnings from "./pages/earnings";
import Wizard from "./pages/wizard";
import Launch from "./pages/launch";
import Loyalty from "./pages/loyalty-programs";
import PoolCreate from "./pages/pool-create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="landing" element={<Landing />} />
          <Route path="trade" element={<Trade />} />
          <Route path="pools" element={<Pools />} />
          <Route path="/pools/:id" element={<PoolDetails />} />
          <Route path="positions" element={<Positions />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="wizard" element={<Wizard />} />
          <Route path="launch" element={<Launch />} />
          <Route path="pool-create" element={<PoolCreate />} />
          <Route path="loyalty-programs" element={<Loyalty />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
