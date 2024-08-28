import React, { useState, useEffect } from "react";
import styles from "./DatePicker.module.css";
import Icon from "../../Icon";
import useDetectElement from "../../hooks/useDetectElement";
import useAniState from "../../hooks/useAniState";
import Box from "../Box";
import Text from "../Text";

export type DatePickerTypeProps = {
  selectedDate?: Date;
  defaultDate?: Date;
  onChange: (date: {
    day: number;
    month: number;
    year: number;
    week: number;
    date: Date;
    time: string;
  }) => void;
  placeholder?: string;
  width?:
    | 25
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 350
    | 400
    | 500
    | 600
    | 700
    | 1000
    | "10%"
    | "25%"
    | "50%"
    | "75%"
    | "100%"
    | "25vw"
    | "50vw"
    | "75vw"
    | "100vw";
};

const DatePicker = ({
  selectedDate = new Date(),
  defaultDate,
  onChange,
  placeholder,
  width = 200,
}: DatePickerTypeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | undefined>(
    selectedDate
  );
  const weekTitles = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const ref = React.useRef<any>();
  const detect = useDetectElement(ref);
  const { theme } = useAniState();

  const getTime = (date: Date) => {
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      week: Number(date.getDay()) + 1,
      date,
      time: `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}/${
        date.getDate() < 10 ? "0" : ""
      }${date.getDate()}`,
    };
  };

  const getTitle = (date: Date | undefined) => {
    if (!date) return "";
    return `${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const daysInMonth = (month: number, year: number) => {
    return new Array(31)
      .fill("")
      .map((v, i) => getTime(new Date(year, month - 1, i + 1)))
      .filter((v) => v.month === month);
  };

  const generateCalendar = React.useMemo(() => {
    const date = currentDate || new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const returnDay = daysInMonth(month, year);
    const dayInLastMonths = daysInMonth(
      month - 1 === 0 ? 12 : month - 1,
      month - 1 === 0 ? year - 1 : year
    );
    const dayInNextMonths = daysInMonth(
      month + 1 === 13 ? 1 : month + 1,
      month + 1 === 13 ? year + 1 : year
    );
    const lastNumber = 8 - (8 - returnDay[0].week) - 1;
    const lengthLast = lastNumber > 0 ? lastNumber : 7;

    const lengthNext = 42 - (returnDay.length + lengthLast);

    return [
      ...dayInLastMonths.slice(0 - lengthLast),
      ...returnDay,
      ...dayInNextMonths.slice(0, lengthNext),
    ];
  }, [currentDate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setCurrentDate(newDate);
    onChange(getTime(newDate));
  };

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
    setIsOpen(false);
    onChange(getTime(date));
  };

  const toggleCalendar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!detect) {
      setIsOpen(false);
    }
  }, [detect]);

  // Đồng bộ currentDate với selectedDate mỗi khi selectedDate thay đổi
  useEffect(() => {
    if (defaultDate && !currentDate) {
      setCurrentDate(defaultDate);
    }
  }, [defaultDate && currentDate]);

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate && selectedDate.getTime() !== currentDate?.getTime()]);

  const onPrevYear = () => {
    const time = currentDate || new Date();
    time.setFullYear(time.getFullYear() - 1);
    setCurrentDate(new Date(time));
  };
  const onNextYear = () => {
    const time = currentDate || new Date();
    time.setFullYear(time.getFullYear() + 1);
    setCurrentDate(new Date(time));
  };
  const onPrevMonth = () => {
    const time = currentDate || new Date();
    time.setMonth(time.getMonth() - 1);
    setCurrentDate(new Date(time));
  };
  const onNextMonth = () => {
    const time = currentDate || new Date();
    time.setMonth(time.getMonth() + 1);
    setCurrentDate(new Date(time));
  };

  return (
    <div className={styles.datePicker} ref={ref}>
      <input
        type="text"
        className={`${styles.dateInput} UI-2ANI-BOX-width-${width} ${theme?.backgroundColorClass || ""}`}
        value={currentDate ? getTime(currentDate).time : ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={toggleCalendar}
        readOnly
      />
      <button className={styles.calendarButton} onClick={toggleCalendar}>
        <Icon type="calendar" color="#3fa5ff" />
      </button>
      {isOpen && <div className={`${styles.overlay}`}></div>}
      {isOpen && (
        <div
          className={`${styles.calendar} ${theme?.backgroundColorClass || ""}`}
        >
          <Box noCopy className={styles.calendarTitle}>
            <Text weight="bold" size="h5">
              Lịch
            </Text>
            <div className={styles.calendarTitleIcon} onClick={toggleCalendar}>
              <Icon type="close" />
            </div>
          </Box>
          <Box noCopy className={styles.nav}>
            <div className={styles.navButton}>
              <div onClick={onPrevYear} className={styles.navButtonIcon}>
                <Icon type="angle-left" color="#3fa5ff" />
              </div>
              <div className={styles.navButtonLine}></div>
              <div onClick={onPrevMonth} className={styles.navButtonIcon}>
                <Icon type="arrow-left" color="#ff5c5c" />
              </div>
            </div>
            <div className={styles.navView}>{getTitle(currentDate)}</div>
            <div className={styles.navButton}>
              <div onClick={onNextMonth} className={styles.navButtonIcon}>
                <Icon type="arrow-right" color="#ff5c5c" />
              </div>
              <div className={styles.navButtonLine}></div>
              <div onClick={onNextYear} className={styles.navButtonIcon}>
                <Icon type="angle-right" color="#3fa5ff" />
              </div>
            </div>
          </Box>
          <div className={styles.calendarGrid}>
            {weekTitles.map((title: string) => (
              <div key={title} className={styles.dayTitle}>
                {title}
              </div>
            ))}
            {generateCalendar.map((day) => (
              <div
                key={day.date.toISOString()}
                className={`${styles.calendarDay} ${
                  day.date.toDateString() ===
                  (currentDate && currentDate.toDateString())
                    ? styles.selected
                    : ""
                } ${
                  (currentDate || new Date()).getMonth() === day.date.getMonth()
                    ? styles.inMonth
                    : styles.outMonth
                }`}
                onClick={() => handleDateClick(day.date)}
              >
                {day.date.getDate()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
