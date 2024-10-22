/** 
  * L: Danh sách các ngày trong tuần viết hoa
  * l: Danh sách các ngày trong tuần viết thường
  * tK: Ký tự cho "lúc" viết thường
  * TK: Ký tự cho "Lúc" viết hoa
  * eM: Danh sách các tháng viết thường
  * EM: Danh sách các tháng viết hoa
  * tY: Ký tự cho "năm" viết thường
  * TY: Ký tự cho "Năm" viết hoa
  * vx: Ký tự cho "Vừa xong"
  * vp: Ký tự cho "Vài giây trước"
  * vs: Ký tự cho "Sắp tới"
  * vv: Ký tự cho "trước"
  * xx: Ký tự cho "sau"
  * tD: Ký tự cho "ngày" viết thường
  * TD: Ký tự cho "Ngày" viết hoa
  * tM: Ký tự cho "tháng" viết thường
  * TM: Ký tự cho "Tháng" viết hoa
  * tH: Ký tự cho "giờ" viết thường
  * TH: Ký tự cho "Giờ" viết hoa
  * tI: Ký tự cho "phút" viết thường
  * TI: Ký tự cho "Phút" viết hoa
  * tS: Ký tự cho "giây" viết thường
  * TS: Ký tự cho "Giây" viết hoa

*/
export type FormatDateOptions =
  | "YYYY/MM/DD"
  | "DD/MM/YYYY"
  | "YYYY-MM-DD"
  | "MM-DD-YYYY"
  | "YY/MM"
  | "MM/YY"
  | "DD/MM"
  | "MM/DD"
  | "YYYY/MM"
  | "MM/YYYY"
  | "YY-MM"
  | "MM-YY"
  | "DD-MM"
  | "MM-DD"
  | "YYYY-MM"
  | "MM-YYYY"
  | "L"
  | "LL"
  | "LT"
  | "F"
  | "YYYY/MM/DD HH:mm"
  | "DD/MM/YYYY HH:mm"
  | "YYYY-MM-DD HH:mm"
  | "MM-DD-YYYY HH:mm"
  | "YYYY/MM/DD HH:mm:ss"
  | "DD/MM/YYYY HH:mm:ss"
  | "YYYY-MM-DD HH:mm:ss"
  | "MM-DD-YYYY HH:mm:ss"
  | "HH:mm"
  | "HH:mm:ss"
  | "HH:mm:ss.SSS"
  | (string & {}); // Thêm cả mili giây nếu cần

export type DateLocalization = {
  L: string[]; // Danh sách các ngày trong tuần viết hoa
  l: string[]; // Danh sách các ngày trong tuần viết thường
  tK: string; // Ký tự cho "lúc" viết thường
  TK: string; // Ký tự cho "Lúc" viết hoa
  eM: string[]; // Danh sách các tháng viết thường
  EM: string[]; // Danh sách các tháng viết hoa
  tY: string; // Ký tự cho "năm" viết thường
  TY: string; // Ký tự cho "Năm" viết hoa
  vx: string; // Ký tự cho "Vừa xong"
  vp: string; // Ký tự cho "Vài giây trước"
  vs: string; // Ký tự cho "Sắp tới"
  vv: string; // Ký tự cho "trước"
  xx: string; // Ký tự cho "sau"
  tD: string; // Ký tự cho "ngày" viết thường
  TD: string; // Ký tự cho "Ngày" viết hoa
  tM: string; // Ký tự cho "tháng" viết thường
  TM: string; // Ký tự cho "Tháng" viết hoa
  tH: string; // Ký tự cho "giờ" viết thường
  TH: string; // Ký tự cho "Giờ" viết hoa
  tI: string; // Ký tự cho "phút" viết thường
  TI: string; // Ký tự cho "Phút" viết hoa
  tS: string; // Ký tự cho "giây" viết thường
  TS: string; // Ký tự cho "Giây" viết hoa
};

export type Language = "vi" | "en" | "ja" | "lo" | "zh" | "fr";
