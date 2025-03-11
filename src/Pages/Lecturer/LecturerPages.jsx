import "../../Style/Pages/Subjects.css";
import "../../Style/Pages/Teachers.css";
import { useEffect, useState, memo, useCallback } from "react";
import Loader from "../../Components/Loader";
import { useAlert } from "../../Components/AlertContextProvider";

function AddLecturerPages() {
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
        emp_no: '',
        name: '',
        email: '',
        password: ''
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

    const addLecturer = async (e) => {
        e.preventDefault();

      
    // Validate form data
    if (!formData.emp_no || !formData.name || !formData.email || !formData.password) {
        showWarning('All fields are required.');
        return;
    }

        const lecturerData = {
            emp_no: formData.emp_no,
            full_name: formData.name,
            email: formData.email,
            password: formData.password
        };

        try {
            setDisplayLoader(true);

            const response = await fetch('https://app.pasinduu.me/lecturers.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lecturerData),
            });

            const result = await response.json();

            if (response.ok) {
                showSuccess('Lecturer added successfully!');
            } else {
                showError(result.message);
                console.error('Failed to add Lecturer:', result);
            }
        } catch (error) {
            showError('An error occurred. Please try again later.');
            console.error('Error occurred while adding Lecturer:', error);
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
                        onSubmit={addLecturer}
                    >
                        <div className="inputs-container-heading">Add Lecturer</div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="emp_no">
                               Employee No:
                            </label>
                            <input
                                type="text"
                                id="emp_no"
                                className="input-box"
                                name="emp_no"
                                value={formData.emp_no}
                                placeholder="Ex. 1004"
                                onChange={inputOnChangeHandler}
                            />
                        </div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="name">
                                Lecturer Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="input-box"
                                name="name"
                                value={formData.name}
                                placeholder="Ex. Sandaruwani Pathirage"
                                onChange={inputOnChangeHandler}
                            />
                        </div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="input-box"
                                name="email"
                                value={formData.email}
                                placeholder="Ex. supun@nibm.lk"
                                onChange={inputOnChangeHandler}
                            />
                        </div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="password">
                                Passowrd:
                            </label>
                            <input
                                type="text"
                                id="password"
                                className="input-box"
                                name="password"
                                value={formData.password}
                                placeholder=""
                                onChange={inputOnChangeHandler}
                            />
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


export default memo(AddLecturerPages);
