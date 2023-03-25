import type { RootState } from '../App';
import type { Course, Author, User } from '../helpers';

export const selectUser = (state: RootState): User => state.user;
export const selectCourses = (state: RootState): Course[] => state.courses;
export const selectAuthors = (state: RootState): Author[] => state.authors;
