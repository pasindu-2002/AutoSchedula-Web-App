import "../../Style/Pages/Subjects.css";
import "../../Style/Pages/Teachers.css";
import { useEffect, useState, memo, useCallback } from "react";
import Loader from "../../Components/Loader";
import { useAlert } from "../../Components/AlertContextProvider";
import axios from "axios";

function AddBatchPage() {
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

    useEffect(() => {
        // Fetch course options from the API
        const fetchCourses = async () => {
            try {
                const response = await axios.get("https://app.pasinduu.me/getAll.php?type=course");
                if (response.data && Array.isArray(response.data.data)) {
                    setCourseOptions(response.data.data); 
                }
            } catch (error) {
                console.error("Error fetching course options:", error);
            }
        };

        const fetchLecturers = async () => {
            try {
                const response = await axios.get("https://app.pasinduu.me/getAll.php?type=lecturer");
                if (response.data && Array.isArray(response.data.data)) {
                    setLecturerOptions(response.data.data); 
                }
            } catch (error) {
                console.error("Error fetching lecturer options:", error);
            }
        };

        fetchCourses();
        fetchLecturers();
        
    }, []);


    const [formData, setFormData] = useState({
        batch_code: '',
        course_code: '',
        course_director: '',
    });
    const [displayLoader, setDisplayLoader] = useState(false);
    const { showSuccess, showError,showWarning } = useAlert();

    const inputOnChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addBatch = async (e) => {
        e.preventDefault();

      
    // Validate form data
    if (!formData.batch_code || !formData.course_code || !formData.course_director) {
        showWarning('All fields are required.');
        return;
    }

        const batchData = {
          batch_code: formData.batch_code,
          course_code: formData.course_code,
          course_director: formData.course_director,
        };

        try {
            setDisplayLoader(true);

            const response = await fetch('https://app.pasinduu.me/batch.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(batchData),
            });

            const result = await response.json();

            if (response.ok) {
                showSuccess('Course added successfully!');
            } else {
                showError(result.message);
                console.error('Failed to add course:', result);
            }
        } catch (error) {
            showError('An error occurred. Please try again later.');
            console.error('Error occurred while adding course:', error);
        } finally {
            setDisplayLoader(false);
        }
    };

    return (
        <>
            <div className="top-sub-container">
                <div className="left-sub-container">
                    <form
                        className="details-container"
                        onSubmit={addBatch}
                    >
                        <div className="inputs-container-heading">Add Batch</div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="batch_code">
                                Batch Code:
                            </label>
                            <input
                                type="text"
                                id="batch_code"
                                className="input-box"
                                name="batch_code"
                                value={formData.batch_code}
                                placeholder="Ex. GADSE222F"
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

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="course_director">
                                Course Director:
                            </label>
                            <select
                                id="course_director"
                                className="input-box"
                                name="course_director"
                                value={formData.course_director}
                                onChange={inputOnChangeHandler}
                            >
                                <option value="" disabled>
                                    Select a Course Director
                                </option>
                                {lecturerOptions.map((lecturer) => (
                                    <option key={lecturer.emp_no} value={lecturer.emp_no}>
                                        {lecturer.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="save-btn-container">
                            <button
                                className="subject-save-btn"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {displayLoader && <Loader />}
        </>
    );
}


export default memo(AddBatchPage);
