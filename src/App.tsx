import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CharacterDetail from "./pages/CharacterDetail";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;