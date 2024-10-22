export type PostPropsType = {
  content: string;
  images: { src: string; alt: string }[];
  videoUrl: string;
  link: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};

export const articles: PostPropsType[] = [
  {
    content: "<p>This is a text post</p>",
    images: [],
    videoUrl: "",
    link: "",
    createdAt: "2024-09-12T08:00:00Z",
    user: {
      id: "1",
      name: "John Doe",
      avatar:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-35.jpg",
    },
  },
  {
    content: "<p>This is a post with an image</p>",
    images: [
      {
        src: "https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645928.jpg",
        alt: "Image 1",
      },
      {
        src: "https://cdn.wallpapersafari.com/55/83/Pl6QHc.jpg",
        alt: "Image 2",
      },
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
        src: "https://4kwallpapers.com/images/walls/thumbs/18363.jpg",
        alt: "Image 9",
      },
    ],
    videoUrl: "",
    link: "",
    createdAt: "2024-09-11T09:00:00Z",
    user: {
      id: "2",
      name: "Jane Smith",
      avatar:
        "https://img.freepik.com/free-photo/illustration-anime-character-rain_23-2151394670.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725494400&semt=ais_hybrid",
    },
  },
  {
    content: "<p>This is a post with a video</p>",
    images: [],
    videoUrl: "https://example.com/video.mp4",
    link: "",
    createdAt: "2024-09-10T10:00:00Z",
    user: {
      id: "3",
      name: "Alice Johnson",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThlRLmhmD5wHjrIEDG7JMcCo9M0cLUooCgQnmZVwPrZDyMlXODeanSuG5-I4WPFUdpeTY&usqp=CAU",
    },
  },
  {
    content: "<p>This is a post with a link</p>",
    images: [],
    videoUrl: "",
    link: "https://example.com",
    createdAt: "2024-09-12T11:00:00Z",
    user: {
      id: "4",
      name: "Bob Brown",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_oV1M0dqUqHtrKzIO7eHAS6LbDG9pbkkCD_VKlWljpkFCBSGROuME6hQt2YE3I2r4RUc&usqp=CAU",
    },
  },
  {
    content: "<p>This is a post with text and media</p>",
    images: [
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
    ],
    videoUrl: "https://example.com/video2.mp4",
    link: "https://example.com/post",
    createdAt: "2024-09-12T12:00:00Z",
    user: {
      id: "5",
      name: "Charlie Green",
      avatar:
        "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/10/avatar-doi-thumbnail.jpg",
    },
  },
];

export const loginConfig = {
  values: {
    account: "",
    password: "",
  },
  requires: {
    account: {
      notNull: true,
      message: "Vui lòng nhập mật khẩu ít hơn 50 ký tự",
      function: (arg: any) => {
        // if (arg && arg.account && !REGEX_EMAIL.test(arg.account)) {
        //   return {
        //     checked: true,
        //     message: "Tài khoản không đúng định dạng",
        //   };
        // }

        return {
          checked: false,
        };
      },
    },
    password: {
      notNull: true,
      minLength: {
        rule: 5,
        message: "Vui lòng nhập mật khẩu nhiều hơn 5 ký tự",
      },
      maxLength: {
        rule: 50,
        message: "Vui lòng nhập mật khẩu ít hơn 50 ký tự",
      },
      function: (arg: any) => {
        // if (arg && arg.password && !REGEX_PASSWORD.test(arg.password)) {
        //   return {
        //     checked: true,
        //     message: "Mật khẩu không đúng định dạng",
        //   };
        // }

        return {
          checked: false,
        };
      },
    },
  },
};
