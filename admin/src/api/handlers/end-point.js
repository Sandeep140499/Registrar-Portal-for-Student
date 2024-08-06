const apiEndPoint = {
  //state and country
  country: "/country",
  getState: (countryId) => `state/country/${countryId}`,
  getCity: (stateId) => `city/state/${stateId}`,
};
export default apiEndPoint;
