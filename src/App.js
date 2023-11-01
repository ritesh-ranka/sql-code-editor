import React from "react";

import HeaderComponent from "./components/HeaderComponent";
import LeftSection from "./components/LeftSection";
import EditorSection from "./components/EditorSection";
import RightSection from "./components/RightSection";

function App() {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <LeftSection></LeftSection>
        <EditorSection></EditorSection>
        <RightSection></RightSection>
      </div>
    </div>
  );
}

export default App;
