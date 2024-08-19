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

export const Search = {
  // filter: (array:any, )
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
// Console default

export const clearConsole = () => {
  console.clear();
  console.log("%cNGUY HIỂM ", "font-weight: bold; color: red; font-size: 40px");
  console.log(
    "%cNếu ai đó bảo bạn dán một đoạn mã bất kỳ vào đây, đó có thể là hành vi đánh cắp dữ liệu. Hãy cẩn thận!",
    "font-weight: bold; color: black; font-size: 16px"
  );
};

//Disable Scroll body

export const preventDefault = (e: any) => {
  e.preventDefault();
};

export const disableScrollBody = {
  open: () => {
    try {
      let element: any = document.getElementById("children");
      if (element && window.innerWidth > 1000) {
        element.style.overflowY = "hidden";
        // element.style.paddingRight = "17px";
        element.style.overscrollBehaviorY = "contain";
      }

      let divElement: any = document.getElementById("app");
      if (divElement) {
        divElement.style.overflowY = "hidden";
        divElement.style.overscrollBehaviorY = "contain";
      }

      if (window.innerWidth < 1000) {
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = "0px";
        document.body.style.overscrollBehaviorY = "contain";
        document.documentElement.style.overflowY = "hidden";
        document.documentElement.style.paddingRight = "0px";
        document.documentElement.style.overscrollBehaviorY = "contain";
      }

      document.body.addEventListener("touchmove", preventDefault, {
        passive: false,
      });
      document.addEventListener("touchforcechange", preventDefault, {
        passive: false,
      });
    } catch (error) {}
  },
  close: () => {
    try {
      let element: any = document.getElementById("children");
      if (element) {
        element.style.overflowY = "overlay";
        element.style.paddingRight = "0px";
        element.style.overscrollBehaviorY = "auto";
      }

      let divElement: any = document.getElementById("app");
      if (divElement) {
        divElement.style.overflowY = "overlay";
        divElement.style.paddingRight = "0px";
        divElement.style.overscrollBehaviorY = "auto";
      }

      if (window.innerWidth < 1000) {
        document.body.style.overflowY = "overlay";
        document.body.style.paddingRight = "0px";
        document.body.style.overscrollBehaviorY = "auto";
        document.documentElement.style.overflowY = "overlay";
        document.documentElement.style.paddingRight = "0px";
        document.documentElement.style.overscrollBehaviorY = "auto";
      }

      document.body.removeEventListener("touchmove", preventDefault);
      document.body.removeEventListener("touchforcechange", preventDefault);
    } catch (error) {}
  },
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

export function formatMoney(price: string | number) {
  return Number(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function hiddenTooltip(text?: string, size?: number) {
  if (!text) return "";
  if (text?.length > (size ? size : text.length)) {
    return text;
  }
}

export function upperCaseFirstText(name?: string) {
  if (!name || !name?.length) {
    return "";
  }

  const newName: any = [];
  const oldName = name.split(" ");

  for (let index = 0; index < oldName.length; index++) {
    let element = oldName[index]?.trim() || null;
    let text = "";

    if (element?.length) {
      if (
        element === "II" ||
        element === "I" ||
        element === "III" ||
        element === "IV" ||
        element === "V"
      ) {
        text = element;
      } else {
        const newElement = element.split("");

        if (newElement?.length) {
          if (
            newElement[0] === "[" ||
            newElement[0] === "(" ||
            newElement[0] === "<" ||
            newElement[0] === "/" ||
            newElement[0] === "{" ||
            newElement[0] === "|" ||
            newElement[0] === '"' ||
            newElement[0] === "'" ||
            newElement[0] === "!" ||
            newElement[0] === "*"
          ) {
            text =
              newElement[0] +
              newElement[1]?.toUpperCase() +
              element.slice(2)?.toLowerCase();
          } else {
            text =
              newElement[0].toUpperCase() + element.slice(1)?.toLowerCase();
          }
        }
      }

      newName.push(text);
    }
  }

  return newName.join(" ");
}

export const removeAccents = (str: any) => {
  return (
    str
      ?.normalize("NFD")
      ?.replace(/[\u0300-\u036f]/g, "")
      ?.replace(/đ/g, "d")
      .replace(/Đ/g, "D") || ""
  )
    .trim()
    ?.toLowerCase()
    ?.replace(" ", "-");
};
export const removeAccentOrigin = (str: any) => {
  return (
    str
      ?.normalize("NFD")
      ?.replace(/[\u0300-\u036f]/g, "")
      ?.replace(/đ/g, "d")
      .replace(/Đ/g, "D") || ""
  )
    .trim()
    ?.replace(" ", "-");
};

export const removeAccents2 = (str: any) => {
  return (
    str
      ?.normalize("NFD")
      ?.replace(/[\u0300-\u036f]/g, "")
      ?.replace(/đ/g, "d")
      .replace(/Đ/g, "D") || ""
  )
    .trim()
    ?.toLowerCase()
    ?.replaceAll(" ", "-");
};

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
