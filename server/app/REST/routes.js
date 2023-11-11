import { gradeEndpoint } from "./grade.endpoint";
import { subjectEndpoint } from "./subject.endpoint";


const routes = function (router) {
    gradeEndpoint(router);
    subjectEndpoint(router);
};

export default routes;