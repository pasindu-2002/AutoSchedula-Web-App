import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import AddCoursePage from './Pages/Course/CoursePages';
import AddBatchPage from './Pages/Batch/BatchPages';
import AddLecturerPage from './Pages/Lecturer/LecturerPages';
import StudentPage from './Pages/Student/StudentPages';
import ModulePage from './Pages/Module/ModulePages';
import TimeTablesPage from './Pages/TimeTables/TimeTablesPage';
import "./Style/BasicComponents.css";
import { useEffect, useRef } from 'react';
import Menubar from './Components/Menubar';
import OwnerFooter from './Components/OwnerFooter';
import { AlertProvider, useAlert } from './Components/AlertContextProvider';
import Alert from './Components/Alert';
import { ConfirmProvider, useConfirm } from './Components/ConfirmContextProvider';
import Confirm from './Components/Confirm';
import { addWindowCloseEventHandler, removeWindowCloseEventHandler } from './Script/commonJS';
import NotFound from './Pages/NotFound/NotFound';

function App() {
    return (
        <AlertProvider>
            <ConfirmProvider>
                <BrowserRouter future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}>
                    <MainApp />
                </BrowserRouter>
            </ConfirmProvider>
        </AlertProvider>
    );
}

function MainApp() {
    const app = useRef(null);
    const { showWarningConfirm } = useConfirm();
    const { showError } = useAlert();

    function autoToggleInResize() {
        if (window.innerWidth <= 1250) {
            if (app.current)
                app.current.classList.add("active");
        }
        else {
            if (app.current)
                app.current.classList.remove("active");
        }
    }

    useEffect(() => {
        autoToggleInResize();
        window.addEventListener("resize", () => {
            autoToggleInResize();
        });
        addWindowCloseEventHandler(showWarningConfirm, showError);
        return () => {
            window.removeEventListener("resize", () => {
                autoToggleInResize();
            });
            removeWindowCloseEventHandler();
        };
    }, []);

    return (
        <div className='app' ref={app}>
            <Alert />
            <Confirm />
            <Menubar />

            <div className='main-container'>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/Course" element={<AddCoursePage />} />
                    <Route path="/Lecturer" element={<AddLecturerPage />} />
                    <Route path="/Batch" element={<AddBatchPage />} />
                    <Route path="/Students" element={<StudentPage />} />
                    <Route path="/Modules" element={<ModulePage />} />
                    <Route path="/TimeTables" element={<TimeTablesPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <OwnerFooter />
            </div>
        </div>
    );
}

// Remote typescript branch tracking test 2
export default App;
