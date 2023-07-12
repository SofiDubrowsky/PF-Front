import './calendar.css';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import es from 'date-fns/locale/es';
import { useSelector } from 'react-redux';


export default function CalendarComponent() {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const activity = useSelector((state) => state.detail);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleDateChange = (date) => {
    const currentDate = new Date();
    if (isSameDay(date, currentDate) || date > currentDate) {
      setSelectedDate({
        date,
        dayName: capitalize(format(date, 'EEEE', { locale: es }))
      });
    }
    if(!isSameDay(date, currentDate)&&date<currentDate){
      setSelectedDate({
        date,dayName:"Fecha Inválida!"
      })
    }
  };

  const handleClick = (hour) => {
    if (selectedHour === hour) {
      setSelectedHour(null);
    } else {
      setSelectedHour(hour);
    }
  };
  const buttonStyle = (hour) => {
    return {
      backgroundColor: selectedHour === hour ? '#9AC71F' : 'white',
      color: selectedHour === hour ? 'white' : 'black',
    };
  };

  const selectCurrentDate = () => {
    const currentDate = new Date();
    onChange(currentDate);
    handleDateChange(currentDate);
  };

  return (
    <div>
      <div>
      <Calendar onChange={handleDateChange} value={value} />
      <p style={{color:"white"}}>
        Fecha seleccionada:{' '}
        {selectedDate
          ? `${selectedDate.dayName} ${format(selectedDate.date, 'dd/MM/yyyy', { locale: es })}`
          : 'Ninguna'}
      </p>
      <button onClick={selectCurrentDate}>Seleccionar fecha actual</button>
      </div>
      <div style={{color:"white"}}>
      {activity?.hours?.length > 0 ? (
  activity?.hours?.map((hour) => (
    <div key={hour}>
      <button style={buttonStyle(hour)} onClick={() => handleClick(hour)}>
        {hour} hs
      </button>
    </div>
  ))
      ) : ( <p>Sin Horarios</p>)}

      </div>
    </div>
  );
}