// Khi trình soạn thảo thay đổi, bạn có thể nhận được thông báo thông qua LexicalOnChangePlugin!
export interface OnChangeEvent {
  text: string;
  html: string;
  textLength: number;
  textFullLength: number;
  mentions: string[];
  links: string[];
}

export default function onChange(
  html: string,
  onChangeEvent?: (event: OnChangeEvent) => void
): { text: string | null; html: string | null } | void {
  try {
    if (onChangeEvent) {
      const temp : any = document.createElement("div");
      const mentions: string[] = [];
      const links: string[] = [];
      temp.innerHTML = html;

      temp.querySelectorAll("span").forEach((element: any) => {
        if (element) {
          const mention = element.getAttribute("data-mention-token");
          if (mention) {
            mentions.push(mention);
          }

          const URL_MATCHER =
            /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

          const arrayString = element?.innerText?.split(" ") || [];

          if (arrayString?.length) {
            for (let index = 0; index < arrayString.length; index++) {
              if (URL_MATCHER.test(arrayString[index])) {
                links.push(arrayString[index]);
              }
            }
          }
        }
      });

      const event: OnChangeEvent = {
        text: temp.innerText || "",
        html: temp.innerHTML || "",
        textLength: temp.innerText?.replaceAll(" ", "")?.length || 0,
        textFullLength: temp.innerText?.trim()?.length || 0,
        mentions: Array.from(new Set(mentions)),
        links: Array.from(new Set(links)),
      };

      onChangeEvent(event);

      return {
        text: temp.innerText,
        html: temp.innerHTML,
      };
    }
  } catch (error) {
    console.error("Error in onChange function:", error);
  }
}
