import { multilingual } from "./helper";
import { DateLocalization, FormatDateOptions } from "./type";

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

class Time {
  private date: Date;
  private locale: string;

  constructor(date: Date | string) {
    if (!date) {
      throw new Error(
        "Date cannot be null or undefined. Please provide a valid date string or Date object."
      );
    }

    this.date = new Date(date);
    if (isNaN(this.date.getTime())) {
      throw new Error(
        "The date is not valid. Please provide a valid date string or Date object."
      );
    }

    this.locale = "vi"; // Default locale
  }

  private formatDate(
    format: FormatDateOptions,
    formatLanguage: DateLocalization
  ): string {
    let newFormat: any = format;
    if (format === "L") {
      newFormat = "L, DD eM tY YYYY";
    }
    if (format === "LL") {
      newFormat = "L, DD eM tY YYYY tK HH:mm";
    }
    if (format === "LT") {
      newFormat = "L, DD eM tY YYYY tK hh:mm";
    }

    if (format === "F") {
      const now = new Date().getTime();
      const timeUnil = this.date.getTime();
      const diff = now - timeUnil;

      // Thay đổi đơn vị thời gian theo nhu cầu
      const seconds = 1000;
      const minutes = seconds * 60;
      const hours = minutes * 60;
      const days = hours * 24;
      const month = days * 30;
      const year = days * 365.6;

      newFormat = `MM/YYYY`;

      if (diff < minutes) {
        newFormat = "vx";
      }

      if (diff < 30 * seconds) {
        newFormat = "vp";
      }

      if (diff < 0) {
        newFormat = "vs";
      }

      if (diff >= minutes && diff < hours) {
        newFormat = `${Math.floor(diff / minutes)} tI vv`;
      }

      if (diff >= hours && diff < days) {
        newFormat = `${Math.floor(diff / hours)} tH vv`;
      }

      if (diff >= days && diff < month) {
        newFormat = `${Math.floor(diff / days)} tD vv`;
      }

      if (diff >= month && diff < year) {
        newFormat = `DD/MM`;
      }
    }
    const pad = (n: number) => (n < 10 ? `0${n}` : n.toString());

    const year = this.date.getFullYear();
    const month = pad(this.date.getMonth() + 1);
    const day = pad(this.date.getDate());

    // Lấy giờ, phút, giây và mili giây
    const hours24 = this.date.getHours();
    const minutes = pad(this.date.getMinutes());
    const seconds = pad(this.date.getSeconds());
    const milliseconds = this.date.getMilliseconds(); // Mili giây không cần pad vì có thể lớn hơn 100

    // Lấy thứ trong tuần (0: Chủ nhật, 1: Thứ 2, ... 6: Thứ 7)
    const yearShort = year.toString().slice(-2);
    const hours12 = hours24 % 12 || 12;
    const ampm = hours24 >= 12 ? "PM" : "AM";

    return newFormat
      .split(" ")
      .map((key: any) =>
        key?.trim()
          ? key
              .replace("YYYY", year.toString())
              .replace("YY", yearShort)
              .replace("MM", month)
              .replace("DD", day)
              .replace("HH", pad(hours24)) // giờ theo định dạng 24 giờ
              .replace("hh", pad(hours12)) // giờ theo định dạng 12 giờ
              .replace("mm", minutes)
              .replace("ss", seconds)
              .replace("SSS", milliseconds)
              .replace("A", ampm) // thêm AM/PM
              .replace("L", formatLanguage.L[this.date.getDay()])
              .replace("l", formatLanguage.l[this.date.getDay()])
              .replace("tK", formatLanguage.tK)
              .replace("TK", formatLanguage.TK)
              .replace("eM", formatLanguage.eM[this.date.getMonth()])
              .replace("EM", formatLanguage.EM[this.date.getMonth()])
              .replace("tY", formatLanguage.tY)
              .replace("TY", formatLanguage.TY)
              .replace("vx", formatLanguage.vx)
              .replace("vp", formatLanguage.vp)
              .replace("vv", formatLanguage.vv)
              .replace("vs", formatLanguage.vs)
              .replace("xx", formatLanguage.xx)
              .replace("tD", formatLanguage.tD)
              .replace("TD", formatLanguage.TD)
              .replace("tM", formatLanguage.tM)
              .replace("TM", formatLanguage.TM)
              .replace("tH", formatLanguage.tH)
              .replace("TH", formatLanguage.TH)
              .replace("tI", formatLanguage.tI)
              .replace("TI", formatLanguage.TI)
              .replace("tS", formatLanguage.tS)
              .replace("TS", formatLanguage.TS)
          : ""
      )
      .join(" ");
  }

  public format(
    format: FormatDateOptions = "DD/MM/YYYY",
    configLanguage?: DateLocalization
  ): string {
    const formatLanguage = multilingual[this.locale];
    return this.formatDate(format, configLanguage || formatLanguage);
  }

  public lang(lang: string): this {
    if (!multilingual[lang]) {
      throw new Error(`Language '${lang}' not supported.`);
    }
    this.locale = lang;
    return this;
  }

  public toString(): string {
    return this.format("DD/MM/YYYY");
  }
}

export const time = (date: Date | string) => new Time(date);
