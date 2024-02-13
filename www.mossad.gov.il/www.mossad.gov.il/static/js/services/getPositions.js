export default function getPositions(search, change) {
  var axios = require("axios");
  var data = JSON.stringify({
    SearchString: search,
  });

  var config = {
    method: "post",
    url:
      window.location.hostname == "localhost"
        ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/GetPositions"
        : "/Roham.DMZ/api/ManagedActions/GetPositions",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      change(response.data.payload.positions);

      // search? change(positions.filter(x => x.title.includes(search))) : change(positions)
    })
    .catch(function (error) {
      return error;
    });
}
