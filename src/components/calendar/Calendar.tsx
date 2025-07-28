import { addMonths, subMonths } from 'date-fns';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Calendar = () => {

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const day = () => {
    switch (new Date().getDay()) {
      case 0: return "일";
      case 1: return "월";
      case 2: return "화";
      case 3: return "수";
      case 4: return "목";
      case 5: return "금";
      case 6: return "토";
    }
  }

  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: day, //오늘 요일
  };

  const [current, setCurrent] = useState(new Date());
  const [calendarList, setCalendarList] = useState(Array.from({ length: 42 }, () => false))
  // console.log("calendarList: ", calendarList)
  //   useEffect(() => {
  //     setCalendarList(list.data.filter(x => new Date(x.date).getFullYear() == current.getFullYear() && new Date(x.date).getMonth() == current.getMonth()));
  //   }, [list, current]);

  const [calendarNextList, setCalendarNextList] = useState(Array.from({ length: 42 }, () => false))

  const [calendarMutiSelect, setCalendarMultiSelect] = useState<{ state: boolean, clickDate: number, direction: string }>({
    state: false,
    clickDate: 0,
    direction: ''
  }) // 캘린더를 누른 상태에서 한번더 누르면 마지막 누른 날짜까지 배경색 칠해짐

  const [selectedYear] = useState(today.year); // 현재 선택된 연도
  const [selectedMonth] = useState(today.month); // 현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); // 선택된 연도, 달의 마지막 날짜
  const curMonthStartDate = new Date(
    current.getFullYear(),
    current.getMonth(),
    1
  ).getDay();

  const nextMonthStartDate = new Date(
    current.getFullYear(),
    current.getMonth() + 1,
    1
  ).getDay();

  const prevMonthEndDate = new Date(
    current.getFullYear(),
    current.getMonth(),
    0
  ).getDate();

  const prevMonth = () => {
    setCurrent(subMonths(current, 1))
    setCalendarList(Array.from({ length: 42 }, () => false))
  }

  const nextMonth = () => {
    setCurrent(addMonths(current, 1))
    setCalendarList(Array.from({ length: 42 }, () => false))
  }

  const select = (distraction: string, index: number) => {
    if (distraction == 'L') {
      if (calendarMutiSelect.state) {
        if(calendarMutiSelect.direction == 'R'){
          setCalendarNextList(Array.from({ length: 42 }, () => false))
          setCalendarList(Array.from({ length: 42 }, (_, i) => i === index));
          setCalendarMultiSelect({ state: true, clickDate: index, direction: 'L' })
        }else {
          setCalendarList(calendarList.map((_, i) => i >= calendarMutiSelect.clickDate && i <= index));
          setCalendarMultiSelect({ state: false, clickDate: 0, direction: 'L' })
        }
      } else {
        setCalendarNextList(Array.from({ length: 42 }, () => false))
        setCalendarList(Array.from({ length: 42 }, (_, i) => i === index));
        setCalendarMultiSelect({ state: true, clickDate: index, direction: 'L' })
      }
    } else {
      if (calendarMutiSelect.state) {
        if (calendarMutiSelect.direction === 'L') {
          setCalendarNextList(calendarNextList.map((_, i) => i <= index));
          setCalendarMultiSelect({ state: false, clickDate: 0, direction: 'R' })
          setCalendarList(calendarList.map((_, i) => i >= calendarList.findIndex(x => x)))
        }else {
          setCalendarNextList(calendarNextList.map((_, i) => i >= calendarMutiSelect.clickDate && i <= index));
          setCalendarMultiSelect({ state: false, clickDate: 0, direction: 'R' })
        }
      } else {
        setCalendarList(Array.from({length: 42 }, () => false))
        setCalendarNextList(Array.from({ length: 42 }, (_, i) => i === index));
        setCalendarMultiSelect({ state: true, clickDate: index, direction: 'R' })
      }
    }
  }

  return (
    <div className='flex gap-3'>
      <div>
        <div className='flex items-center'>
          <FaAngleLeft className='cursor' onClick={prevMonth} />
          <div className='font-bold mb-2 flex-1 flex justify-center'>{current.getFullYear()}년 {current.getMonth() + 1}월</div>
        </div>
        <div className='flex'>
          {week.map((x, index) => {
            return (
              <div key={index} className='flex-1'>
                <div className='flex justify-center my-3'>{x}</div>
              </div>
            )
          })}
        </div>
        <div className='flex flex-wrap'>
          {Array.from({ length: 42 }).map((_, index) => {
            const curr = index - curMonthStartDate + 1;
            const prev = prevMonthEndDate - curMonthStartDate + index + 1;

            return (
              <div key={index} style={{ width: '14.28%' }}>
                <div className={`flex items-center justify-center h-9 cursor
                ${calendarList[index] ? 'bg-green-200' : ''}
                ${nextMonthStartDate > index ? 'text-gray-300' : ''}
                ${nextMonthStartDate > index ? prev : dateTotalCount < curr ? 'text-gray-300' : ''}`}
                  onClick={(e) => {
                    if (nextMonthStartDate > index || nextMonthStartDate > index ? prev : dateTotalCount < curr) {
                      e.preventDefault()
                    } else {
                      select('L', index)
                    }
                  }}>{curMonthStartDate > index ? prev : dateTotalCount < curr ? '' : curr}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <div className='flex items-center'>
          <div className='font-bold mb-2 flex-1 flex justify-center'>{current.getFullYear()}년 {current.getMonth() + 2}월</div>
          <FaAngleRight className='cursor' onClick={nextMonth} />
        </div>
        <div className='flex'>
          {week.map((x, index) => {
            return (
              <div key={index} className='flex-1'>
                <div className='flex justify-center my-3'>{x}</div>
              </div>
            )
          })}
        </div>
        <div className='flex flex-wrap'>
          {Array.from({ length: 42 }).map((_, index) => {
            const curr = index - nextMonthStartDate + 1;
            const prev = prevMonthEndDate - nextMonthStartDate + index + 1;
            const next = curr - dateTotalCount;

            return (
              <div key={index} style={{ width: '14.28%' }}>
                <div className={`flex items-center justify-center h-9 cursor 
                ${calendarNextList[index] ? 'bg-green-200' : ''}
                ${nextMonthStartDate > index ? 'text-gray-300' : ''}
                ${nextMonthStartDate > index ? prev : dateTotalCount < curr ? 'text-gray-300' : ''}`}
                  onClick={(e) => {
                    if (nextMonthStartDate > index || nextMonthStartDate > index ? prev : dateTotalCount < curr) {
                      e.preventDefault()
                    } else {
                      select('R', index)
                    }
                  }}>{nextMonthStartDate > index ? '' : dateTotalCount < curr ? next : curr}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Calendar