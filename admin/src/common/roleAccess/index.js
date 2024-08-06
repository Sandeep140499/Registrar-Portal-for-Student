export const CheckAccess = (permissionGroupName, permission) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (user) {
    let role = user?.user_role?.paramName;
    if (role) {
      if (
        role.hasOwnProperty(permissionGroupName) &&
        Array.isArray(role[permissionGroupName])
      ) {
        return role[permissionGroupName].includes(permission);
      }
    }

    return false;
  }
};
