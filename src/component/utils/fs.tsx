//Lấy ra các thông số độ dài, khoảng cách của một element
export const SizeOfElement = (element: any) => {
  try {
    let { width, height, top, right, bottom, left } =
      element.getBoundingClientRect();

    let parentHeight = document.body.offsetHeight;
    let parentWidth = document.body.offsetWidth;
    let parentFullHeight = document.body.scrollHeight;
    let parentFullWidth = document.body.scrollWidth;
    let scrollHeight = element.scrollHeight;
    let scrollWidth = element.scrollWidth;
    let scrollLeft = element.scrollLeft || 0;

    return {
      width: width,
      height: height,
      elementTop: top,
      elementBottom: parentHeight - bottom,
      elementRight: parentWidth - right,
      elementLeft: left,
      screenHeight: parentHeight,
      screenWidth: parentWidth,
      htmlWidth: parentFullWidth,
      htmlHeight: parentFullHeight,
      scrollHeight: scrollHeight,
      scrollWidth: scrollWidth,
      scrollLeft,
    };
  } catch (error) {
    return {
      width: 0,
      height: 0,
      elementTop: 0,
      elementBottom: 0,
      elementRight: 0,
      elementLeft: 0,
      screenHeight: 0,
      screenWidth: 0,
      htmlWidth: 0,
      htmlHeight: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      scrollLeft: 0,
    };
  }
};
//Scroll màn hình
export const scrollView = {
  async top(
    element?: any,
    number?: number,
    behavior?: ScrollBehavior | undefined
  ) {
    if (element)
      return element.scrollTo({
        top: number ?? 0,
        behavior: behavior ?? "smooth",
      });
    return window.scrollTo({
      top: number ?? 0,
      behavior: `${behavior ? behavior : "smooth"}`,
    });
  },
  async left(element: any, number?: number) {
    if (element) return (element.scrollLeft = number ?? 0);
    return window.scrollTo({ top: number ?? 0, behavior: "smooth" });
  },
  async center(element: any, number?: number) {
    if (element)
      return element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    return document.getElementsByTagName("html")[0].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  },
};

//Sắp xếp (Phải truyền key nếu muốn sắp xếp object)
export const Sort = {
  // Sắp xếp tăng dần
  asc: (array: any, key?: string) => {
    if (!array) return [];
    return array.sort((a: any, b: any) => {
      if (key) return a[key] - b[key];
      return a - b;
    });
  },
  //Sắp xếp giảm dần
  desc: (array: any, key?: string) => {
    if (!array) return [];
    return array.sort((a: any, b: any) => {
      if (key) return b[key] - a[key];
      return b - a;
    });
  },
};
export const stopParentEvent = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
};

// cắt chuỗi
export const stringCut = (s?: string, l?: number, dot?: boolean) => {
  if (!s || !l) return "";

  return (
    s.substring(0, l ?? s.length) + (dot ? (l < s.length ? "..." : "") : "")
  );
};

export const preventDefault = (e: any) => {
  e.preventDefault();
};

//Random Text
export const randText = function (size: number) {
  let result = "";
  let key = "0123456789abcdefghijklmnopqryABCDEFGHIJKLMNOPQRSTUVWXY";
  let length = key.length;
  for (let i = 0; i < size; i++) {
    result += key.charAt(Math.floor(Math.random() * length));
  }
  return result;
};

export function formatNumber(price: string | number, dot?: string) {
  return Number(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, dot || ".");
}

export function compareNumbers(a: any, b: any) {
  return a - b;
}

export const getTextWidth = (text: string) => {
  try {
    const tag = document.createElement("div");
    tag.style.position = "absolute";
    tag.style.left = "-99in";
    tag.style.whiteSpace = "nowrap";
    tag.innerHTML = text;

    document.body.appendChild(tag);
    const result = tag.clientWidth;
    document.body.removeChild(tag);
    return result;
  } catch (error) {
    return 0;
  }
};
