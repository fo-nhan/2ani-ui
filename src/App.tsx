import React from "react";
import "./App.css";
import { Editor, Popup, useAniState } from "./component";
function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const state = useAniState();

  console.log(state);

  return (
    <div className="App">
      <Editor placeholder="Viết thử đi" hashTags />
    </div>
  );
}

export default App;
