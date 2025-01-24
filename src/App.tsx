import React from "react";
import "./App.css";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Cropper,
  DatePicker,
  Editor,
  Form,
  FormItem,
  FullView,
  ImageGallery,
  Input,
  Layout,
  Popup,
  Radio,
  Select,
  Slide,
  Switch,
  timejs,
  useAniState,
  useForm,
  useGetSizeImage,
  View,
} from "./component";
import { loginConfig } from "./helper";
import { anitimejs } from "anitimejs";
function App() {
  const [selectedFruit, setSelectedFruit] = React.useState("apple");
  const form = useForm<{
    username: string;
    email: string;
    rule: boolean;
  }>({
    username: [
      { required: true, message: "Username không được để trống" },
      { minLength: 3, message: "Username must be at least 3 characters" },
    ],
    // email: [
    //   { required: true, message: "Nhanvien1 email is required" },
    //   {
    //     pattern: /\S+@\S+\.\S+/,
    //     message: "Please enter a valid email address for nhanvien1",
    //   },
    // ],
    rule: [{ required: true, message: "Rule is required" }],
  });

  const handleFinish = (values: { username: string; email: string }) => {
    console.log("Form submitted:", values);
  };

  React.useEffect(() => {
    form.setFieldValue("username", 1);
  }, []);
  return (
    // <div className="App">
    //   <Form form={form} onFinish={handleFinish}>
    //     <FormItem name="username" label="Username">
    //       <Input type="number" />
    //     </FormItem>
    //     <FormItem name="rule" label="Rule">
    //       <DatePicker placeholder="Vui lòng" />
    //     </FormItem>
    //     {/* <div>
    //       <FormItem name="email" label="Email">
    //         <input />
    //       </FormItem>
    //     </div> */}

    //     <Button type="submit">Submit</Button>
    //   </Form>
    // </div>
    <Layout>
      <Layout.Menu
        position="sticky"
        placement="top"
        menuConfig={{
          sideBar: {
            width: 40,
            borderRadius: 20,
            openBackground: "primary",
            closeBackground: "default",
            openColor: "white",
            sizeIcon: 20,
          },
          logo: {
            img: "https://marketplace.canva.com/EAE85VgPq3E/1/0/1600w/canva-v%E1%BA%BD-tay-h%C3%ACnh-tr%C3%B2n-logo-c3Jw1yOiXJw.jpg",
            width: 50,
            name: "Test web",
            nameHiddenPc: true,
          },
          search: {
            width: 300,
            data: [
              {
                id: 1,
                title:
                  "Có lẽ một ngày nào đó mặt trời mọc đằng tây thì anh sẽ biết thời gian là gì",
                description:
                  "Có lẽ một ngày nào đó mặt trời mọc đằng tây thì anh sẽ biết thời gian là gì",
                type: "history",
                img: "https://marketplace.canva.com/EAE85VgPq3E/1/0/1600w/canva-v%E1%BA%BD-tay-h%C3%ACnh-tr%C3%B2n-logo-c3Jw1yOiXJw.jpg",
              },
            ],
          },
          boxProps: {
            gap: 10,
            paddingX: 10,
          },
          feat: [
            {
              icon: "house",
            },
            {
              icon: "house",
              title: "About",
            },
            {
              icon: "house",
            },
            {
              icon: "house",
            },
          ],
        }}
      />
      <div style={{ display: "flex" }}>
        <Layout.Sidebar position="sticky" side="left" width="250px">
          12
        </Layout.Sidebar>
        <Layout.Content>
          <Box style={{ height: 2000 }}>ABC</Box>
        </Layout.Content>
      </div>
      <Layout.Footer hiddenPaths={["/login", "/register"]}>
        <div></div>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
