export const apiEndpoints = {
  user: `user`,
  createUser: `auth/register`,
  userById: (id) => `user/${id}`,

  changePassword: (id) => `user/change-password/${id}`,
  forgetPassword: `user/change-password`,

  //designation
  designation: `designation`,
  deignationById: (id) => `designation/${id}`,

  //department
  department: `department`,
  departmentById: (id) => `department/${id}`,

  //college
  college: `college`,
  collegeById: (id) => `college/${id}`,

  //university
  university: `university`,
  universityById: (id) => `university/${id}`,

  //employee
  employee: `employee`,
  employeeById: (id) => `employee/${id}`,

  //region
  country: "country",
  countryId: (countryId) => `country/${countryId}`,
  state: "state",
  
  stateById: (countryId) => `state/${countryId}`,
  city: "city",
  cityById: (stateId) => `city/${stateId}`,
};
