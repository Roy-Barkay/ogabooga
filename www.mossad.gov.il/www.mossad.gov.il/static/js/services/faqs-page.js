export default function getFaqsPage(change) {
  var axios = require("axios");

  var config = {
    method: "post",
    url:
      window.location.hostname == "localhost"
        ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetFaqsPage"
        : "/Roham.DMZ/api/ManagedActions/GetFaqsPage",
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
