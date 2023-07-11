import './calendar.css';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import es from 'date-fns/locale/es';

export default function CalendarComponent() {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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
  };

  const selectCurrentDate = () => {
    const currentDate = new Date();
    onChange(currentDate);
    handleDateChange(currentDate);
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={value} locale={es} />
      <p>
        Fecha seleccionada:{' '}
        {selectedDate
          ? `${selectedDate.dayName} ${format(selectedDate.date, 'dd/MM/yyyy', { locale: es })}`
          : 'Ninguna'}
      </p>
      <button onClick={selectCurrentDate}>Seleccionar fecha actual</button>
    </div>
  );
}