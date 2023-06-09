import { StudentController } from "./controllers/student-controller"

export const Routes = [{
    method: "get",
    route: "/students",
    controller: StudentController,
    action: "all"
}, {
    method: "get",
    route: "/students/:nusp",
    controller: StudentController,
    action: "one"
}, {
    method: "post",
    route: "/students",
    controller: StudentController,
    action: "save"
}, {
    method: "delete",
    route: "/students/:nusp",
    controller: StudentController,
    action: "remove"
}, {
    method: "post",
    route: "/students/:nusp/feedback",
    controller: StudentController,
    action: "postFeedbackReport"
}, {
    method: "post",
    route: "/students/enrollment/:positionId",
    controller: StudentController,
    action: "enrollInPosition"
}]