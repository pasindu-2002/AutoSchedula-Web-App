import "../../Style/Pages/Subjects.css";
import "../../Style/Pages/Teachers.css";
import { useEffect, useState, memo, useCallback } from "react";
import Loader from "../../Components/Loader";
import { useAlert } from "../../Components/AlertContextProvider";
import axios from "axios";

function AddStudentPages() {
  return (
    <>
      <div className="page subjects">
        <MainComponents />
      </div>
    </>
  );
}

function MainComponents() {

    const [batchOptions, setBatchOptions] = useState([]);

    useEffect(() => {
        // Fetch  batch options from the API
        const fetchBatch = async () => {
            try {
                const response = await axios.get("https://app.pasinduu.me/getAll.php?type=batch");
                if (response.data && Array.isArray(response.data.data)) {
                    setBatchOptions(response.data.data); 
                    console.log(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching  batch options:", error);
            }
        };

        fetchBatch();
        
    }, []);


    const [formData, setFormData] = useState({
        stu_id: '',
        name: '',
        email: '',
        password: '',
        batch: '',
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

    const addStudent = async (e) => {
        e.preventDefault();

      
    // Validate form data
    if (!formData.stu_id || !formData.name || !formData.email || !formData.password || !formData.batch) {
        showWarning('All fields are required.');
        return;
    }

        const studentData = {
            stu_id: formData.stu_id,
            full_name: formData.name,
            email: formData.email,
            password: formData.password,
            batch: formData.batch,
        };

        try {
            setDisplayLoader(true);

            const response = await fetch('https://app.pasinduu.me/student.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });

            const result = await response.json();

            if (response.ok) {
                showSuccess('Student added successfully!');
            } else {
                showError(result.message);
                console.error('Failed to add Student:', result);
            }
        } catch (error) {
            showError('An error occurred. Please try again later.');
            console.error('Error occurred while adding student:', error);
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
                        onSubmit={addStudent}
                    >
                        <div className="inputs-container-heading">Add Students</div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="stu_id">
                               Student No:
                            </label>
                            <input
                                type="text"
                                id="stu_id"
                                className="input-box"
                                name="stu_id"
                                value={formData.stu_id}
                                placeholder="Ex. GAHDSE232F-011"
                                onChange={inputOnChangeHandler}
                            />
                        </div>

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="input-box"
                                name="name"
                                value={formData.name}
                                placeholder="Ex. A H P Eranga"
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
                                placeholder="Ex. GAHDSE232F-011@student.nibm.lk"
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

                        <div className="input-container">
                            <label className="input-box-heading" htmlFor="batch_code">
                                Batch:
                            </label>
                            <select
                                type="text"
                                id="batch"
                                className="input-box"
                                name="batch"
                                value={formData.batch}
                                placeholder="Ex. GAHDSE232F"
                                onChange={inputOnChangeHandler}
                            >
                                <option value="" disabled>
                                    Select a Batch
                                </option>
                                {batchOptions.map((batch) => (
                                    <option key={batch.batch_code} value={batch.batch_code}>
                                        {batch.batch_code}
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


export default memo(AddStudentPages);
