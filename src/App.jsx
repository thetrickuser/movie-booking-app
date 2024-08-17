import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
