
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import "./css/index.css"
import PageNotFound from "./component/PageNotFound";
import Search from "./component/Search";
import Restaurant from "./component/Restaurant";
const App = ()=>{
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:meal_id/:meal_name" element={<Search />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;