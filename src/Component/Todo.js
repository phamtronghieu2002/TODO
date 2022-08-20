import './TodoList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useReducer } from 'react';
import { state, reducer } from './Store/Reducer';
import { SET_JOB, SET_JOBS, SET_VIEW, SET_JOB_UPDATE, SET_EDIT_JOB, SET_CHECKED_LIST } from './Store/Actions';
//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Todo() {
    const notify = () => toast('công việc đã có trong list');

    let [State, dispath] = useReducer(reducer, state);
    console.log(State.jobUpdate);
    let refInputJob = useRef();

    let refInputEdit = useRef();

    let refJob = useRef('');

    useEffect(() => {
        refInputEdit.current && refInputEdit.current.focus();
    }, [State.editJob]);

    const todo_List_View = ['All', 'Done', 'Todo'];

    let renderJobs = (job, index) => {
        let Type = !State.checked_list.includes(job) ? 'span' : 'del';

        return (
            <li
                key={index}
                className="items-todo fw-semibold fs-5 p-2 ps-3 pe-3 mt-2  d-flex justify-content-between  align-items-center"
            >
                {State.editJob == job ? (
                    <input
                        onChange={(e) => {
                            dispath(SET_JOB_UPDATE(e.target.value));
                        }}
                        onBlur={() => {
                            refJob.current == State.jobUpdate
                                ? dispath(SET_EDIT_JOB(''))
                                : handleEditJob(refJob.current);
                        }}
                        value={State.jobUpdate}
                        ref={refInputEdit}
                        className="form-control update-job me-4 "
                    />
                ) : (
                    <Type className="name-todo">{job}</Type>
                )}
                <div className="actions align-items-center d-flex justify-content-center">
                    <input
                        onChange={() => {
                            if (State.checked_list.includes(job)) {
                                dispath(SET_CHECKED_LIST(State.checked_list.filter((val) => val !== job)));
                            } else {
                                dispath(SET_CHECKED_LIST([...State.checked_list, job]));
                            }
                        }}
                        checked={State.checked_list.includes(job)}
                        className="form-check-input"
                        type="checkbox"
                    />

                    <div
                        onClick={() => {
                            dispath(SET_JOB_UPDATE(job));
                            dispath(SET_EDIT_JOB(job));
                            refJob.current = job;
                        }}
                        className=" ms-3 me-3 pen-icon text-warning"
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </div>
                    <div
                        onClick={() => {
                            dispath(SET_CHECKED_LIST([...State.checked_list.filter((val) => val != job)]));
                            handleDel(job);
                            dispath(SET_EDIT_JOB(''));
                        }}
                        className="del-icon text-danger"
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            </li>
        );
    };

    let loadView = (view) => {
        switch (view) {
            case 'All':
                return State.jobs.map(renderJobs);
            case 'Done':
                let jobsDone = State.jobs.filter((job) => State.checked_list.includes(job));
                return jobsDone.map(renderJobs);
            case 'Todo':
                let jobsTodo = State.jobs.filter((job) => !State.checked_list.includes(job));
                return jobsTodo.map(renderJobs);
            default:
                break;
        }
    };

    let handleAddToDo = () => {
        if (State.jobs.includes(State.job)) {
            notify();
            refInputJob.current.focus();
        } else {
            dispath(SET_JOBS([...State.jobs, State.job]));
            dispath(SET_JOB(''));
            refInputJob.current.focus();
        }
    };

    let handleView = (view) => {
        dispath(SET_VIEW(view));
    };

    let handleDel = (jobDel) => {
        let newJobs = State.jobs;
        newJobs = newJobs.filter((job) => job != jobDel);
        dispath(SET_JOBS([...newJobs]));
    };

    let handleEditJob = (Job) => {
        let newJobs = State.jobs;
        newJobs.forEach((job, index) => {
            if (newJobs[index] == Job) {
                newJobs[index] = State.jobUpdate;
            }
        });
        dispath(SET_JOBS([...newJobs]));
    };

    let emptyTasks = () => {
        dispath(SET_JOBS([]));
        dispath(SET_CHECKED_LIST([]));
    };

    let empty_done_tasks = () => {
        dispath(SET_JOBS([...State.jobs.filter((job) => !State.checked_list.includes(job))]));
        dispath(SET_EDIT_JOB(''));
    };
    return (
        <div id="wrapper">
            <div className="todo-app">
                {/* todo-input */}
                <div className="todo-input pt-3 pb-3 ps-3 pe-3">
                    <h3 className="fw-bold text-center text-secondary mb-3">TodoInput</h3>

                    <div className="wp-input">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                <FontAwesomeIcon icon={faBook} />
                            </span>
                            <input
                                value={State.job}
                                onChange={(e) => {
                                    dispath(SET_JOB(e.target.value));
                                }}
                                type="text"
                                className="form-control"
                                placeholder="New Todo"
                                ref={refInputJob}
                            />
                        </div>
                        <button
                            disabled={State.job == ''}
                            onClick={handleAddToDo}
                            className="btn btn-success text-light w-100"
                        >
                            Add new task
                        </button>
                    </div>
                </div>
                {/* todo-actions */}
                <div className="todo-actions mt-5">
                    <h3 className="fw-bold text-center text-secondary "> TodoList</h3>
                    <div className="row">
                        {todo_List_View.map((view, index) => {
                            return (
                                <div key={index} className="col-md-4 col-sm-12 mb-3">
                                    <button
                                        onClick={() => {
                                            handleView(view);
                                        }}
                                        className="btn  text-light w-100 btn btn-success "
                                    >
                                        {view}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* todo-list */}
                <div className="todo-list mt-3">
                    <ul className="list-todo"> {loadView(State.view)} </ul>
                </div>
                <div className="todo-actions mt-4">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mb-3 ">
                            <button onClick={empty_done_tasks} className="btn btn-danger text-light w-100 ">
                                Delete done tasks
                            </button>
                        </div>
                        <div onClick={emptyTasks} className="col-md-6 col-sm-12 mb-3  ">
                            <button className="btn btn-danger text-light w-100">Delete all tasks</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
export default Todo;
