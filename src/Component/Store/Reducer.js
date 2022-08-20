import { setJob, setJobs, setView, setChecked_List, setEditJob, setJobUpdate } from './Constant';

let state = {
    job: '',
    jobs: [],
    view: 'All',
    checked_list: [],
    editJob: '',
    jobUpdate: '',
};

function reducer(state, actions) {
    switch (actions.type) {
        case setJob:
            return { ...state, job: actions.payLoad };
        case setJobs:
            return { ...state, jobs: actions.payLoad };
        case setChecked_List:
            return { ...state, checked_list: actions.payLoad };
        case setEditJob:
            return { ...state, editJob: actions.payLoad };
        case setJobUpdate:
            return { ...state, jobUpdate: actions.payLoad };
        case setView:
            return { ...state, view: actions.payLoad };
        default:
            break;
    }
}

export { state, reducer };
