var input = document.getElementById("usernameInput");
var output = document.getElementById("output");

function getUserData(username) {
  return "https://api.github.com/users/" + username;
}

// Optional: Set the request options object
var options = {
  method: "GET",
  headers: {},
  mode: "cors",
  cache: "default"
};

function fetchData() {
  // First fetch the API url end-point and pass in any optional options
  fetch(getUserData(input.value), options)
  // We can check the status of the response to do any error handling and return the response back to the promise chain
  .then(function (data) {
    if (!data.ok) {
      throw new Error("Request failed");
    }
    return data;
  })
  // The fetch API returns a promise which can then be parsed as JSON
  .then(function (data) {
    return data.json();
  })
  // Then take the JSON data and process it in a callback function.
  // This is where the bulk of the data handling will happen.
  .then(function (data) {
    //console.log(data);
    output.innerHTML = "Your name is " + data.name;
  })
  // Catch any errors at the end of the promise chain
  .catch(function (err) {
    output.innerHTML = err.message;
  });
}