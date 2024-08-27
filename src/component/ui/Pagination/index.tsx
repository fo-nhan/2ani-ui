import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.css";
import Icon from "../../Icon";
import Box from "../Box";

export type PaginationProps = {
  total: number;
  size: number;
  page: number;
  onChange: (page: number) => void;
  render?: (page: number) => React.ReactNode;
};
const Pagination = ({
  total = 10,
  size = 10,
  page = 1,
  onChange,
  render,
}: PaginationProps) => {
  const [currentPage, SetCurrentPage] = useState<any>(page || 1);

  const numOfPages = Math.ceil(total / size);

  const numOfButtons: any = [];
  for (let i = 1; i <= numOfPages; i++) {
    numOfButtons.push(i);
  }

  const prevPageClick = () => {
    if (currentPage === 1) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage - 1);
    }
  };

  const nextPageClick = () => {
    if (currentPage === numOfButtons.length) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage + 1);
    }
  };

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfButtons: any = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numOfButtons.length < 6) {
      tempNumberOfButtons = numOfButtons;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfButtons.length];
    } else if (currentPage === 4) {
      const sliced = numOfButtons.slice(0, 5);
      tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length];
    } else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
      const sliced1 = numOfButtons.slice(currentPage - 2, currentPage);
      const sliced2 = numOfButtons.slice(currentPage, currentPage + 1);
      tempNumberOfButtons = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numOfButtons.length,
      ];
    } else if (currentPage > numOfButtons.length - 3) {
      // > 7
      const sliced = numOfButtons.slice(numOfButtons.length - 4);
      tempNumberOfButtons = [1, dotsLeft, ...sliced];
    } else if (currentPage === dotsInitial) {
      SetCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      SetCurrentPage(arrOfCurrButtons[3] + 2);
    } else if (currentPage === dotsLeft) {
      SetCurrentPage(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfButtons);

    onChange?.(currentPage);
  }, [currentPage, total, numOfPages]);

  return (
    <>
      <Box noCopy gap={5} flex="flexCenter">
        <Box
          opacity={currentPage === 1 ? "50%" : "100%"}
          cursor={currentPage === 1 ? "no-drop" : "pointer"}
          onClick={prevPageClick}
          flex="flexAlign"
          align="center"
          className={styles.item}
        >
          <Icon size={16} type="arrow-left" />
        </Box>
        {arrOfCurrButtons.map((data, index) => {
          return (
            <Box
              key={index}
              onClick={() => SetCurrentPage(data)}
              flex="flexAlign"
              align="center"
              className={`${styles.item} ${
                currentPage === data && styles.checked
              }`}
              cursor="pointer"
            >
              {render && String(data).trim() !== "..." ? render(data) : data}
            </Box>
          );
        })}
        <Box
          opacity={currentPage === numOfPages ? "50%" : "100%"}
          cursor={currentPage === numOfPages ? "no-drop" : "pointer"}
          onClick={nextPageClick}
          flex="flexAlign"
          align="center"
          className={styles.item}
        >
          <Icon size={16} type="arrow-right" />
        </Box>
      </Box>
    </>
  );
};

export default Pagination;
