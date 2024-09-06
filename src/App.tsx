import React from "react";
import "./App.css";
import { Box, Editor, Popup, useAniState, View } from "./component";
function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const state = useAniState();

  const images = [
    "https://as2.ftcdn.net/v2/jpg/05/89/23/21/1000_F_589232168_qNBfxUughDMA6LzlXiIg2e0B3ntCmZbH.jpg",
    "https://cdn.wallpapersafari.com/55/83/Pl6QHc.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJgxqDGuYb1Yr9loWjV-XB_zYKKBMsgeCGw&s",
    "https://motionbgs.com/i/c/960x540/media/5675/anime-boy-and-dragon.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuxpat2fo9OJ-FDhoybO_UNxMtDt1p8qX9yA&s",
    "https://c4.wallpaperflare.com/wallpaper/745/67/618/jujutsu-kaisen-anime-boys-anime-hd-wallpaper-preview.jpg",
  ];

  return (
    <div className="App">
      <Box background="auto" flex="flexColumn" gap={20} align="center">
        {images.map((val, i) => (
          <View
            key={i}
            src={val}
            delay={500}
            height={400}
            width={600}
            borderRadius={10}
            parentProps={{
              animation: "zoomIn"
            }}
          />
        ))}
      </Box>
    </div>
  );
}

export default App;
