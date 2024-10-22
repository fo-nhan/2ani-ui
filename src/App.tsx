import React from "react";
import "./App.css";
import {
  Avatar,
  Box,
  Button,
  Cropper,
  Editor,
  Form,
  FormItem,
  FullView,
  ImageGallery,
  Input,
  Popup,
  Slide,
  timejs,
  useAniState,
  useForm,
  useGetSizeImage,
  View,
} from "./component";
import { loginConfig } from "./helper";
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

  const imageGallery = [
    {
      src: "https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645928.jpg",
      alt: "Image 1",
    },
    { src: "https://cdn.wallpapersafari.com/55/83/Pl6QHc.jpg", alt: "Image 2" },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJgxqDGuYb1Yr9loWjV-XB_zYKKBMsgeCGw&s",
      alt: "Image 3",
    },
    {
      src: "https://motionbgs.com/i/c/960x540/media/5675/anime-boy-and-dragon.jpg",
      alt: "Image 4",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuxpat2fo9OJ-FDhoybO_UNxMtDt1p8qX9yA&s",
      alt: "Image 5",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJgxqDGuYb1Yr9loWjV-XB_zYKKBMsgeCGw&s",
      alt: "Image 6",
    },
    {
      src: "https://www.shutterstock.com/shutterstock/videos/1105669781/thumb/1.jpg?ip=x480",
      alt: "Image 7",
    },
    {
      src: "https://w0.peakpx.com/wallpaper/866/637/HD-wallpaper-anime-world-nature.jpg",
      alt: "Image 8",
    },
    {
      src: "https://4kwallpapers.com/images/walls/thumbs/18363.jpg",
      alt: "Image 9",
    },
    {
      src: "https://img.freepik.com/free-photo/mythical-dragon-beast-anime-style_23-2151112842.jpg",
      alt: "Image 9",
    },
    {
      src: "https://www.shutterstock.com/shutterstock/videos/1105769313/thumb/1.jpg?ip=x480",
      alt: "Image 10",
    },
    {
      src: "https://c4.wallpaperflare.com/wallpaper/189/854/571/anime-landscape-anime-art-painting-sea-wallpaper-preview.jpg",
      alt: "Image 11",
    },
    // Add more images as needed
  ];

  const imageSizes = useGetSizeImage(imageGallery);

  const form = useForm({
    defaultConfig: loginConfig,
  });

  return (
    <div className="App">
      <Box flex="flexBetween">
        <Box
          minHeight={"100vh"}
          width={"100%"}
          maxWidth={300}
          background="primary"
          responsive={[
            {
              maxMedia: 1200,
              style: {
                display: "none",
              },
            },
          ]}
        ></Box>
        <Box
          width={"100%"}
          background="auto"
          flex="flexColumn"
          gap={20}
          align="center"
        >
          <Cropper />
          <Box width={"100%"} minHeight={250}>
            <Slide
              data={imageGallery}
              render={(value) => (
                <View width={400} height={200} src={value.src} />
              )}
              dotButton
              reSize={1}
              showButton
              start={3}
            />
          </Box>
          <Box width={"100%"} minHeight={400}>
            <View
              src={
                "https://image.cdn2.seaart.ai/2024-06-23/cpsb4mle878c738hgnt0/b871f273b307e8e03e507bf2ac64823ee018d151_high.webp"
              }
              height={400}
              width={600}
              maxWidth={"100%"}
              borderRadius={10}
              objectFit="cover"
              fullView
            />
            {/* <Cropper /> */}
          </Box>
          <Box width={"100%"} height={400}>
            <ImageGallery
              images={imageSizes}
              gap={3}
              // padding={3}
              // list={{
              //   // wHeight: 80,
              //   width: 250,
              // }}
              fullView
            />
          </Box>
          <Box height={200} width={"100%"}>
            <Popup content={<Box width={500}></Box>}>Hello</Popup>
          </Box>
          <Box height={200}>
            <Avatar
              size="bigLarge"
              src="https://wallpaper.forfun.com/fetch/d2/d2663e75b6011f9453063824a820b0ba.jpeg"
              shadow="red"
            />
          </Box>
          {images.map((val, i) => (
            <View
              key={i}
              src={val}
              delay={500}
              height={400}
              width={600}
              maxWidth={"100%"}
              borderRadius={10}
              parentProps={{
                animation: "zoomIn",
              }}
              objectFit="cover"
            />
          ))}
        </Box>
        <Box
          minHeight={"100vh"}
          width={"100%"}
          maxWidth={300}
          background="primary"
          responsive={[
            {
              maxMedia: 1200,
              style: {
                display: "none",
              },
            },
          ]}
        ></Box>
      </Box>
    </div>
  );
}

export default App;
