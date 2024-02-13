var axios = require("axios");

export default function sendContact(form, ip, successFn, errorFn) {
  var formData = JSON.stringify({
    FirstName: form.firstName,
    LastName: form.lastName,
    FatherName: form.fatherName,
    BirthDate: new Date(form.year + "-" + form.month + "-" + form.day),
    Country: form.country,
    CitizenShip: form.citizenship,
    MobilePhone: form.phone,
    Email: form.email,
    Language: form.language,
    Notes: form.notes,
    IPAddress: ip,
  });

  var config = {
    method: "post",
    url:
      window.location.hostname === "localhost"
        ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/SubmitContactMe"
        : "/Roham.DMZ/api/ManagedActions/SubmitContactMe",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios(config)
    .then(function (response) {
      if (response.status === 200) {
        successFn(true);
      }
    })
    .catch(function (error) {
      errorFn("בעיה בשרת, אנא פנה מאוחר יותר");
      return error;
    });
}
