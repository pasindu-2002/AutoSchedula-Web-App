import "../../Style/Pages/Dashboard.css";
import Loader from "../../Components/Loader";
import { useAlert } from "../../Components/AlertContextProvider";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";

const DashboardPage = () => {
  return (
    <>
      <div className="page dashboard">
        <MainComponents />
      </div>
    </>
  );
};

function MainComponents() {
  const [displayLoader, setDisplayLoader] = useState(false);
  const { showSuccess, showError, showWarning } = useAlert(); // Use alert context

  const [students, setStudents] = useState(0);
  const [lecturers, setLecturers] = useState(0);
  const [batches, setBatches] = useState(0);
  const [courses, setCourses] = useState(0);
  const [modules, setModules] = useState(0);
  const [postaff, setPostaff] = useState(0);

  // Function to fetch data and assign to variables
  const fetchData = async () => {
    try {
      setDisplayLoader(true);
      const response = await fetch("https://app.pasinduu.me/getCount.php");
      const result = await response.json();

      if (result.message === "Counts retrieved successfully") {
        const { students, lecturers, batches, courses, modules, postaff } =
          result.data;

        // Assign values to state variables
        setStudents(students);
        setLecturers(lecturers);
        setBatches(batches);
        setCourses(courses);
        setModules(modules);
        setPostaff(postaff);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally{
      setDisplayLoader(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="top-sub-container">
      {/* 1st section */}
      <div className="left-sub-container">
        <div className="basic-details">
          <div className="basic-details-container">
            <div className="container">
              <Container label="Course" value={courses} />
              <Container label="Batch" value={batches} />
            </div>

            <div className="container">
              <Container label="Lecturers" value={lecturers} />
              <Container label="Modules" value={modules} />
            </div>
          </div>

          <div
            className="basic-details-container"
            style={{ gridTemplateColumns: "auto" }}
          >
            <div className="container">
              <Container
                label="Programing Office Staff(Admin)"
                value={postaff}
              />

              <Container label="Student" value={students} />
            </div>
          </div>
        </div>
      </div>
      {/* 1st section */}
    </div>
  );
}

const Container = memo(({ label = "Demo", value = 0 }) => {
  return (
    <div className="sub-container">
      <div className="title">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
});

export default memo(DashboardPage);
