import React from "react";
import { useAuthContext } from "./context/AuthContext";
import "bootstrap/dist/js/bootstrap.bundle";


import './App.scss';
import ScreenLoader from "./component/ScreenLoader";
import Index from "./pages/Routes";

function App() {
  const { isApploading } = useAuthContext();

  return (
    <>
      {!isApploading ? <Index /> : <ScreenLoader />}
    </>
  );
}

export default App;
