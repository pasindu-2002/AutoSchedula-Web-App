import "../../Style/Pages/Subjects.css";
import "../../Style/Pages/Teachers.css";
import { useEffect, useState, memo, useCallback } from "react";
import Loader from "../../Components/Loader";
import { useAlert } from "../../Components/AlertContextProvider";

function AddCoursePage() {
  return (
    <>
      <div className="page subjects">
        <MainComponents />
      </div>
    </>
  );
}

function MainComponents() {
    const [formData, setFormData] = useState({
        courseCode: '',
        courseName: '',
        faculty: '',
    });
    const [displayLoader, setDisplayLoader] = useState(false);
    const { showSuccess, showError,showWarning } = useAlert(); // Use alert context

    const inputOnChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addCourse = async (e) => {
        e.preventDefault();

      
    // Validate form data
    if (!formData.courseCode || !formData.courseName || !formData.faculty) {
        showWarning('All fields are required.');
        return;
    }

        const courseData = {
            course_code: formData.courseCode,
            course_name: formData.courseName,
            school: formData.faculty,
        };

        try {
            setDisplayLoader(true);

            const response = await fetch('https://app.pasinduu.me/course.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            const result = await response.json();

            if (response.ok) {
                showSuccess('Course added successfully!');
                setFormData({ courseCode: '', courseName: '', faculty: '' });
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
                        onSubmit={addCourse}
                    >
                        <div className="inputs-container-heading">Add Course</div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="courseCode">
                                Course Code:
                            </label>
                            <input
                                type="text"
                                id="courseCode"
                                className="input-box"
                                name="courseCode"
                                value={formData.courseCode}
                                placeholder="Ex. DSE"
                                onChange={inputOnChangeHandler}
                            />
                        </div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="courseName">
                                Course Name:
                            </label>
                            <input
                                type="text"
                                id="courseName"
                                className="input-box"
                                name="courseName"
                                value={formData.courseName}
                                placeholder="Ex. Diploma in Software Engineering"
                                onChange={inputOnChangeHandler}
                            />
                        </div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="faculty">
                                Faculty:
                            </label>
                            <select
                                id="faculty"
                                className="input-box"
                                name="faculty"
                                value={formData.faculty}
                                onChange={inputOnChangeHandler}
                            >
                                <option value="" disabled>
                                    Select Faculty
                                </option>
                                <option value="Computing">Computing</option>
                                <option value="Management">Management</option>
                                <option value="Language">Language</option>
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


export default memo(AddCoursePage);
