import React from 'react';
import './calendar.css'; // Importa tu archivo CSS personalizado

export default function CalendarComponent() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.toLocaleString('es-ES', { month: 'long' });

  const isCurrentDay = (day) => day === currentDay;

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">{currentMonth}</h2>
      <div className="calendar-weekdays">
        <div className="calendar-weekday-text">DOM</div>
        <div className="calendar-weekday-text">LUN</div>
        <div className="calendar-weekday-text">MAR</div>
        <div className="calendar-weekday-text">MIE</div>
        <div className="calendar-weekday-text">JUE</div>
        <div className="calendar-weekday-text">VIE</div>
        <div className="calendar-weekday-text">SAB</div>
      </div>
      <div className="calendar-days">
        {Array.from({ length: 31 }, (_, index) => (
          <div
            key={index + 1}
            className={`calendar-cell ${isCurrentDay(index + 1) ? 'current-day' : ''}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}