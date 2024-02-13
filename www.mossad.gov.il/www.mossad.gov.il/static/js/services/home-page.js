export default function getHomePage(change) {
  var axios = require("axios");

  var config = {
    method: "post",
    url:
      window.location.hostname === "localhost"
        ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetHomePage"
        : "/Roham.DMZ/api/ManagedActions/GetHomePage",
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios(config)
    .then(function (response) {
      change(response.data.payload);
    })
    .catch(function (error) {
      return error;
    });
}
