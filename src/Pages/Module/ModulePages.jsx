import "../../Style/Pages/Subjects.css";
import "../../Style/Pages/Teachers.css";
import { useEffect, useState, memo, useCallback } from "react";
import Loader from "../../Components/Loader";
import { useAlert } from "../../Components/AlertContextProvider";
import axios from "axios";

function AddModulePages() {
  return (
    <>
      <div className="page subjects">
        <MainComponents />
      </div>
    </>
  );
}

function MainComponents() {
  const [courseOptions, setCourseOptions] = useState([]);
  const [lecturerOptions, setLecturerOptions] = useState([]);
  const [moduleOptions, setModuleOptions] = useState([]);

  useEffect(() => {
    // Fetch course options from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://app.pasinduu.me/getAll.php?type=course"
        );
        if (response.data && Array.isArray(response.data.data)) {
          setCourseOptions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching course options:", error);
      }
    };

    const fetchLecturers = async () => {
      try {
        const response = await axios.get(
          "https://app.pasinduu.me/getAll.php?type=lecturer"
        );
        if (response.data && Array.isArray(response.data.data)) {
          setLecturerOptions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching lecturer options:", error);
      }
    };

    const fetchModules = async () => {
      try {
        const response = await axios.get(
          "https://app.pasinduu.me/getAll.php?type=module"
        );
        if (response.data && Array.isArray(response.data.data)) {
          setModuleOptions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching lecturer options.", error);
      }
    };

    fetchModules();
    fetchLecturers();
    fetchCourses();
  }, []);

  const [formData, setFormData] = useState({
    module_code: "",
    module_code_lec: "",
    lecturer: "",
    hours: "",
    module_name: "",
    course_code: "",
  });

  const [displayLoader, setDisplayLoader] = useState(false);
  const { showSuccess, showError, showWarning } = useAlert(); // Use alert context

  const inputOnChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addModuleLecturer = async (e) => {
    e.preventDefault();

    if (!formData.lecturer || !formData.module_code_lec) {
      showWarning("All fields are required");
      return;
    }

    const moduleLecturerData = {
        modules_code: formData.module_code_lec,
        lecturer_id: formData.lecturer,
    };

    try {
      setDisplayLoader(true);

      const response = await fetch("https://app.pasinduu.me/lecturerModules.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleLecturerData),
      });

      const result = await response.json();

      if (response.ok) {
        showSuccess("Module Asssign to Lecturer successfully!");
      } else {
        showError(result.message);
        console.error("Failed to add Asssign:", result);
      }
    } catch (error) {
      showError("An error occurred. Please try again later.");
      console.error("Error occurred while adding Module:", error);
    } finally {
      setDisplayLoader(false);
    }
  };

  const addModule = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.module_code ||
      !formData.module_name ||
      !formData.course_code ||
      !formData.hours
    ) {
      showWarning("All fields are required.");
      return;
    }

    const moduleData = {
      module_code: formData.module_code,
      module_hours: formData.hours,
      module_name: formData.module_name,
      course_code: formData.course_code,
    };

    try {
      setDisplayLoader(true);

      const response = await fetch("https://app.pasinduu.me/modules.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleData),
      });

      const result = await response.json();

      if (response.ok) {
        showSuccess("Module added successfully!");
      } else {
        showError(result.message);
        console.error("Failed to add Module:", result);
      }
    } catch (error) {
      showError("An error occurred. Please try again later.");
      console.error("Error occurred while adding Module:", error);
    } finally {
      setDisplayLoader(false);
    }
  };

  return (
    <>
      <div>
        {/* Add Module Section */}
        <div className="top-sub-container">
          <div className="left-sub-container">
            <form className="details-container" onSubmit={addModule}>
              <div className="inputs-container-heading">Add Module</div>

              <div className="input-container">
                <label className="input-box-heading" htmlFor="module_code">
                  Module Code:
                </label>
                <input
                  type="text"
                  id="module_code"
                  className="input-box"
                  name="module_code"
                  value={formData.module_code}
                  placeholder="Ex. ADBMS"
                  onChange={inputOnChangeHandler}
                />
              </div>

              <div className="input-container">
                <label className="input-box-heading" htmlFor="hours">
                  Module Hours:
                </label>
                <select
                  id="hours"
                  className="input-box"
                  name="hours"
                  value={formData.hours}
                  onChange={inputOnChangeHandler}
                >
                  <option value="" disabled>
                    Select hours
                  </option>
                  <option value="60">60 hours</option>
                  <option value="45">45 hours</option>
                  <option value="30">30 hours</option>
                  <option value="15">15 hours</option>
                </select>
              </div>

              <div className="input-container">
                <label className="input-box-heading" htmlFor="module_name">
                  Module Name:
                </label>
                <input
                  type="module_name"
                  id="module_name"
                  className="input-box"
                  name="module_name"
                  value={formData.module_name}
                  placeholder="Ex. Machine Learning"
                  onChange={inputOnChangeHandler}
                />
              </div>

              <div className="input-container">
                <label className="input-box-heading" htmlFor="course_code">
                  Course Code:
                </label>
                <select
                  id="course_code"
                  className="input-box"
                  name="course_code"
                  value={formData.course_code}
                  onChange={inputOnChangeHandler}
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  {courseOptions.map((course) => (
                    <option key={course.course_code} value={course.course_code}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="save-btn-container">
                <button className="subject-save-btn" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Add Module Section */}

        {/* Add Module-Lecturer Section */}
        <div className="top-sub-container">
          <div className="left-sub-container">
            <form className="details-container" onSubmit={addModuleLecturer}>
              <div className="inputs-container-heading">
                Assign Lecturer for Module
              </div>

              <div className="input-container">
                <label className="input-box-heading" htmlFor="module_code_lec">
                  Module:
                </label>
                <select
                  id="module_code_lec"
                  className="input-box"
                  name="module_code_lec"
                  value={formData.module_code_lec}
                  onChange={inputOnChangeHandler}
                >
                  <option value="" disabled>
                    Select Module
                  </option>
                  {moduleOptions.map((madule) => (
                    <option key={madule.module_code} value={madule.module_code}>
                      {madule.module_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-container">
                <label className="input-box-heading" htmlFor="lecturer">
                  Course Director:
                </label>
                <select
                  id="lecturer"
                  className="input-box"
                  name="lecturer"
                  value={formData.lecturer}
                  onChange={inputOnChangeHandler}
                >
                  <option value="" disabled>
                    Select a Lecturer
                  </option>
                  {lecturerOptions.map((lecturer) => (
                    <option key={lecturer.emp_no} value={lecturer.emp_no}>
                      {lecturer.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="save-btn-container">
                <button className="subject-save-btn" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Add Module-:ecturer Section */}
      </div>
      {displayLoader && <Loader />}
    </>
  );
}

export default memo(AddModulePages);
