export default function getPositionsPage(change) {
  var axios = require("axios");

  var config = {
    method: "post",
    url:
      window.location.hostname === "localhost"
        ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetPositionsPage"
        : "/Roham.DMZ/api/ManagedActions/GetPositionsPage",
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios(config)
    .then(function (response) {
      change(response.data);
    })
    .catch(function (error) {
      return error;
    });
}
