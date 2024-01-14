import { gradeEndpoint } from "./grade.endpoint";
import { subjectEndpoint } from "./subject.endpoint";
import { userEndpoint } from "./user.endpoint";


const routes = function (router) {
    gradeEndpoint(router);
    subjectEndpoint(router);
    userEndpoint(router);
};

export default routes;