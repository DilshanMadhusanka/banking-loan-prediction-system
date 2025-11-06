import UserManagement from "../pages/UserManagement";

export const roleAccess = {
  DASHBOARD: ['ADMIN', 'MANAGER'],
  UPLOAD: ['ADMIN'],
  PREDICT: ['ADMIN', 'STAFF', 'MANAGER', ],
  REPORT: ['ADMIN', 'MANAGER'],
  HISTORY: ['ADMIN', 'MANAGER', 'STAFF'],
  PROFILE: ['ADMIN', 'MANAGER', 'STAFF'],
  USERMANAGEMENT: ['ADMIN'],

};
