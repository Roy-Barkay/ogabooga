export default function getCatalogs(num, change) {
  var axios = require("axios");
  var data = JSON.stringify({
    catalogTypes: num,
  });

  var config = {
    method: "post",
    url:
      window.location.hostname == "localhost"
        ? "http://192.168.40.11/RohamDMZ/api/ManagedActions/GetCatalogs"
        : "/Roham.DMZ/api/ManagedActions/GetCatalogs",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      change(response.data);
    })
    .catch(function (error) {
      return error;
    });
}
