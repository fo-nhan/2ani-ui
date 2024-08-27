import { useState, useEffect } from "react";

const useScrollBottom = (callback: any) => {
  /*

  Cách dùng: Khai báo tương tự như useState

  const [variable, setVariable] = useScrollBottom(callback)

  - Callback là hàm sẽ thực thi nếu scroll đang ở dưới cùng
  - UseScrollBottom sẽ trả về 2 biến state và setState, từ phía giao diện, người dùng có thể tùy chỉnh trạng thái của scroll 
  
  



  */

  //Một biến để kiếm tra xem có đang ở cuối hay không
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    //Add sự kiện scroll vào window
    window.addEventListener("scroll", handleScroll);
    if (isFetching) {
      //Nếu biến usFetching là true thì tức là đang có sự kiện scroll, lúc đó có remove nó
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;
    //Nếu isFetching là true thì thực hiện sự kiện callback
    //Sự kiện callback là sự kiện được người dùng truyền vào
    if (callback) {
      callback(() => {});
    }
  }, [isFetching]);

  function handleScroll() {
    //Lấy ra các kích thức của thẻ body
    let { scrollHeight, offsetHeight } = document.body;
    // Nếu vị trí của màn hình thấp
    if (window.scrollY < scrollHeight - offsetHeight - 100 || isFetching) {
      setIsFetching(false);
      return;
    } else {
      setIsFetching(true);
    }
  }

  return [isFetching, setIsFetching];
};

export default useScrollBottom;
