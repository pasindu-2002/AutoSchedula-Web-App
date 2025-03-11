import "../../Style/Pages/Subjects.css";
import "../../Style/Pages/Teachers.css";
import { useEffect, useState, memo, useCallback } from "react";
import Loader from "../../Components/Loader";
import { useAlert } from "../../Components/AlertContextProvider";
import axios from "axios";

function TimeTablesPage() {
  return (
    <>
      <div className="page subjects">
        <MainComponents />
      </div>
    </>
  );
}

function MainComponents() {

  const [timeTableOptions, settimeTableOptions] = useState([]);

  useEffect(() => {
    // Fetch  timeTable options from the API
    const fetchTimeTable = async () => {
      try {
        setDisplayLoader(true);
        const currentDate = new Date().toISOString().split("T")[0];
        const response = await axios.get(
          `https://app.pasinduu.me/readTimetables.php?date=${currentDate}`
        );
        if (response.data && Array.isArray(response.data.data)) {
          settimeTableOptions(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching  timetable options:", error);
      }
      finally {
        setDisplayLoader(false);
      }
    };

    fetchTimeTable();
  }, []);

  const [formData, setFormData] = useState({
    date: "",
  });

  const [displayLoader, setDisplayLoader] = useState(false);
  const { showSuccess, showError, showWarning } = useAlert(); // Use alert context

 const inputOnChangeHandler = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (value) {
    getTimeTable(value);
  }
};

const getTimeTable = async (date) => {
  try {
    setDisplayLoader(true);
    const response = await axios.get(
      `https://app.pasinduu.me/readTimetables.php?date=${date}`
    );
    if (response.data && Array.isArray(response.data.data)) {
      settimeTableOptions(response.data.data);
      console.log(response.data.data);
    }
  } catch (error) {
    showError("Can not fetch TimeTable please try agin");
    console.error("Error fetching timetable options:", error);
  } finally {
    setDisplayLoader(false);
  }
};


  return (
    <>
      <div className="top-sub-container">
        <div className="left-sub-container">
          <div className="details-container">
            <div className="input-container">
              <label className="input-box-heading" htmlFor="date">
                Module Code:
              </label>
              <input
                type="date"
                id="date"
                className="date-input"
                name="date"
                value={formData.date}
                placeholder="Ex. ADBMS"
                onChange={inputOnChangeHandler}
              />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Module</th>
                  <th>Date</th>
                  <th>Session Type</th>
                  <th>Lecturer</th>
                </tr>
              </thead>
              <tbody style={{textAlign: 'center'}}>
                {timeTableOptions.length > 0 ? (
                  timeTableOptions.map((timetable) => (
                    <tr key={timetable.batch_id + timetable.date} >
                      <td>{timetable.batch_id}</td>
                      <td>{timetable.module_id}</td>
                      <td>{timetable.date}</td>
                      <td>{timetable.session_type}</td>
                      <td>{timetable.lecturer_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {displayLoader && <Loader />}
    </>
  );
}

export default memo(TimeTablesPage);
