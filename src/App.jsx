// src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <>
    
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/country/:id" element={<CountryDetail />} />
        
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
