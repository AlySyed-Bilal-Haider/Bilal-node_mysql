import Add from "./Component/Add";
import Read from "./Component/read";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Add />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </>
  );
}

export default App;
