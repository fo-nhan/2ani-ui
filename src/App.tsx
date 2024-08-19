import React from "react";
import "./App.css";
import "./component/styles/config.css";
import {
  Radio, // False
  alert,
  Checkbox,
  Skeleton,
  Button,
  Modal,
  Text,
} from "./component";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="App">
      <div className="layout">
        <Text weight="500">Button</Text>
        <div>
          <Button children="ABc" onClick={() => setIsOpen(true)} />
          <Modal
            title="Thông báo"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            Hahaha
          </Modal>
        </div>
      </div>
      <div className="layout">
        <div>Modal</div>
        <div>
          <Button children="ABc" />
        </div>
      </div>
      <div className="layout">
        <div>Radio (Đang lỗi)</div>
        <div>
          <Radio name="1" checked>
            ABC
          </Radio>
          <Radio name="1">DEF</Radio>
        </div>
      </div>
      <div className="layout">
        <div>Skeleton</div>
        <div>
          <Skeleton width="200px" height="100px" />
        </div>
      </div>
      <div className="layout">
        <div>Checkbox</div>
        <div>
          <Checkbox>ABC</Checkbox>
        </div>
      </div>
      <button
        onClick={() => {
          alert({
            text: "heello",
            title: "opkeke",
          });
        }}
      >
        Hello
      </button>
    </div>
  );
}

export default App;
