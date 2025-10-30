import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function VacationCalendar({ vacations, showAll = false }) {
  const events = vacations
    .filter((vacation) => showAll || vacation.status === "Approved")
    .map((vacation) => {
      let color;
      switch (vacation.status) {
        case "Pending":
          color = "orange";
          break;
        case "Approved":
          color = "green";
          break;
        case "Rejected":
          color = "red";
          break;
        default:
          color = "gray";
      }
      return {
        title: `${vacation.user_name || vacation.user_id} (${vacation.status})`,
        start: vacation.start_date,
        end: vacation.end_date,
        backgroundColor: color,
        borderColor: color,
        allDay: true,
      };
    });

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      height="auto"
    />
  );
}
