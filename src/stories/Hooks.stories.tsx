import React from "react";
import { Meta } from "@storybook/react";
import { Line, Text } from "../component";
import CodeView from "./CodeView";

// Cấu hình meta cho Storybook
const meta: Meta = {
  title: "Hooks", // Tên của câu chuyện trong Storybook
  tags: ["autodocs"], // Các thẻ để phân loại câu chuyện
  // component: Hooks, // Uncomment nếu Hooks là một thành phần cụ thể
};

export default meta;
export const Hooks = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <div>
      <Text size="h3" weight="bold">
        Function
      </Text>
      <br />
      <Text color="default">
        Tích hợp sẵn các function có thể sử dụng nhiều nơi.
      </Text>
      <br />
      <CodeView
        code={`
  SizeOfElement, //Lấy ra kích thước của phần tử chỉ định, tham số truyền vào là một element
  Sort, //Sắp xếp giảm dần hoặc tăng dần. Có thể sắp xếp cả mảng object và mảng number, string
  getTextWidth, //Lấy ra độ rộng của Text mà bạn muốn kiểm tra
  preventDefault, //Chặn sự kiện bên ngoài
  formatNumber, //CHuyển định dạng số
  randText, //Lấy ra text ngẫu nhiên
  scrollView, //Scroll lên xuống
  stopParentEvent, //Chặn tất cả sự kiện
  stringCut, //Cắt chuỗi
    `}
      />
    </div>
    <Line />
    <div>
      <Text size="h3" weight="bold">
        useAniState()
      </Text>
      <br />
      <Text color="default">
        Nó sẽ trả về các state global. Bạn có thể cập nhật nó hoặc bổ sung thêm
        state tùy thích.
      </Text>
      <br />
      <CodeView
        code={`
        const res = useAniState();
        console.log(res.theme)
    `}
      />
    </div>
    <Line />
    <div>
      <Text size="h3" weight="bold">
        useDetectElement()
      </Text>
      <br />
      <Text color="default">
        Kiểm tra xem phần tử đó có được click vào hay không.
      </Text>
      <br />
      <CodeView
        code={`
        const res = useDetectElement(ref)
    `}
      />
    </div>
    <Line />
    <div>
      <Text size="h3" weight="bold">
        useTouch()
      </Text>
      <br />
      <Text color="default">
        Touch được sử dụng dưới mobile, bắt các sự kiện trượt chạm màn hình
      </Text>
      <br />
      <CodeView
        code={`
        const res = useTouch(ref)
    `}
      />
    </div>
    <Line />
    <div>
      <Text size="h3" weight="bold">
        useScrollBottom()
      </Text>
      <br />
      <Text color="default">Sử lý sự kiện khi scroll đến cuối màn hình</Text>
      <br />
      <CodeView
        code={`
        const res = useScrollBottom(callback)
    `}
      />
    </div>
    <Line />
    <div>
      <Text size="h3" weight="bold">
        useScroll()
      </Text>
      <br />
      <Text color="default">
        Trả về khoảng cách top, bottom của scroll screen màn hình.
      </Text>
      <br />
      <CodeView
        code={`
        const res = useScroll()
    `}
      />
    </div>
    <Line />
    <div>
      <Text size="h3" weight="bold">
        useHover()
      </Text>
      <br />
      <Text color="default">
        Nhận vào một ref, nó sẽ trả về biến true, false để bạn biết element có
        được hover hay không.
      </Text>
      <br />
      <CodeView
        code={`
        const res = useHover(ref)
    `}
      />
    </div>
    <Line />
    <div>
      <Text size="h3" weight="bold">
        useWidth()
      </Text>
      <br />
      <Text color="default">
        Sử dụng để lấy kích thước màn hình khi nó có sự thay đổi
      </Text>
      <br />
      <CodeView
        code={`
        const width = useWidth()
    `}
      />
    </div>
    <Line />
  </div>
);
