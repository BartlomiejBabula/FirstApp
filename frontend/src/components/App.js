import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost/api")
      .then((res) => {
        console.log("POLACZONE", res.body);
      })
      .catch(() => {
        console.log("ERRRRR");
      });
  });

  return (
    <>
      <p>QUPA OLE</p>
    </>
  );
}

export default App;
