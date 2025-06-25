import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import calendarReducer from './calendar/calendarSlice';
import studentsReducer from './students/studentsSlice';
import teachersReducer from './teachers/teachersSlice';
import notificationsReducer from './notifications/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarReducer,
    students: studentsReducer,
    teachers: teachersReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
