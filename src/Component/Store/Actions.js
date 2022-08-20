import { setJob, setJobs, setView, setChecked_List, setEditJob, setJobUpdate } from './Constant';

let SET_JOB = (payLoad) => {
    return {
        type: setJob,
        payLoad,
    };
};

let SET_JOBS = (payLoad) => {
    return {
        type: setJobs,
        payLoad,
    };
};

let SET_VIEW = (payLoad) => {
    return {
        type: setView,
        payLoad,
    };
};

let SET_CHECKED_LIST = (payLoad) => {
    return {
        type: setChecked_List,
        payLoad,
    };
};

let SET_EDIT_JOB = (payLoad) => {
    return {
        type: setEditJob,
        payLoad,
    };
};
let SET_JOB_UPDATE = (payLoad) => {
    return {
        type: setJobUpdate,
        payLoad,
    };
};

export { SET_JOB, SET_JOBS, SET_CHECKED_LIST, SET_VIEW, SET_JOB_UPDATE, SET_EDIT_JOB };
