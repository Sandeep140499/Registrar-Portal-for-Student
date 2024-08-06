// Function to build the query object
const buildQuery = (queryParameters) => {
  const query = {};

  for (const key in queryParameters) {
    if (queryParameters[key]) {
      // Special handling for pageSize
      if (key === "pageSize") {
        const parsedPageSize = parseInt(queryParameters[key], 10);
        query[key] = !isNaN(parsedPageSize) ? parsedPageSize : 20;
      } else {
        // For other parameters, perform partial string search with case-insensitive regex
        query[key] = { $regex: new RegExp(queryParameters[key], "i") };
      }
    }
  }

  return query;
};
// Function to build the query object
const buildQueryNested = (queryParameters) => {
  const query = {};
  for (const key in queryParameters) {
    if (queryParameters[key]) {
      // Special handling for pageSize
      if (key === "pageSize") {
        const parsedPageSize = parseInt(queryParameters[key], 10);
        query[key] = !isNaN(parsedPageSize) ? parsedPageSize : 20;
      } else {
        // For other parameters, check if it's a nested property
        if (key.includes(".")) {
          const [parentKey, nestedKey] = key.split("."); // Split the key into parent and nested keys
          if (!query[parentKey]) {
            query[parentKey] = {}; // Create an empty object for the parent key if it doesn't exist
          }
          query[parentKey][nestedKey] = {
            $regex: new RegExp(queryParameters[key], "i"),
          };
          console.log(query,'dddddddddd')
        } else {
          // For non-nested parameters, perform partial string search with case-insensitive regex
          query[key] = { $regex: new RegExp(queryParameters[key], "i") };
        }
      }
    }
  }

  return query;
};

module.exports = { buildQuery, buildQueryNested };
