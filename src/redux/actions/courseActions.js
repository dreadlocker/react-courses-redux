import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export const loadCoursesSuccess = (courses) => {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
};
export const updateCourseSuccess = (courses) => {
  return { type: types.UPDATE_COURSE_SUCCESS, course: courses };
};
export const createCourseSuccess = (courses) => {
  return { type: types.CREATE_COURSE_SUCCESS, course: courses };
};
export const deleteCourseOptimistic = (course) => {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
};

export const loadCourses = () => {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
};

export const saveCourse = (course) => {
  // eslint-disable-next-line
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
};

export const deleteCourse = (course) => {
  // eslint-disable-next-line
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
};
