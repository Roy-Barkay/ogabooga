var axios = require("axios");

export default function sendApplication(
  form,
  file,
  hash,
  recaptchaResponse,
  successFn,
  errorFn
) {
  var formData = new FormData();
  formData.append("oReq.FirstName", form.firstName);
  formData.append("oReq.LastName", form.lastName);
  formData.append("oReq.IDNumber", form.id);
  formData.append("oReq.Email", form.email);
  formData.append("oReq.MobilePhone", form.phone);
  formData.append(
    "oReq.BirthDate",
    form.year + "-" + form.month + "-" + form.day
  );
  formData.append("oReq.ReferSourceID", form.how);
  for (var i = 0; i < form.languages.length; i++) {
    formData.append(
      "oReq.Languages[" + i + "].LanguageId",
      form.languages[i].languageID
    );
    formData.append(
      "oReq.Languages[" + i + "].languageName",
      form.languages[i].languageName
    );
    formData.append(
      "oReq.Languages[" + i + "].LanguageLevelID",
      form.languages[i].languageLevelID
    );
  }
  formData.append("oReq.DutyTypeID", form.volunteered);
  formData.append("oReq.Remarks", form.notes);
  formData.append("oReq.Attachment", file[0]);
  for (var b = 0; b < form.attachedPosition.length; b++) {
    formData.append(
      "oReq.AttachedPositions[" + b + "].id",
      form.attachedPosition[b].id
    );
    formData.append(
      "oReq.AttachedPositions[" + b + "].name",
      form.attachedPosition[b].name
        ? form.attachedPosition[b].name
        : form.attachedPosition[b].title
    );
  }
  formData.append("oReq.HashCode", hash);
  formData.append("oReq.captchaResponse", recaptchaResponse);

  var config = {
    method: "post",
    url:
      window.location.hostname === "localhost"
        ? "https://mossad.gov.il/Roham.DMZ/api/ManagedActions/SubmitMyPosition"
        : "/Roham.DMZ/api/ManagedActions/SubmitMyPosition",
    data: formData,
    //   headers: { "Content-Type": "multipart/form-data" },
    headers: {
      Accept: "application/zip",
    },
    responseType: "blob",
  };
  axios(config)
    .then(function (response) {
      if (response.status === 200) {
        // let blob = new Blob([response.data], {
        //     type: response.headers['content-type']
        // })
        // successFn(blob)
        successFn(true);
      }
    })
    .catch(function (error) {
      errorFn("בעיה בשרת, אנא פנה מאוחר יותר");
      return error;
    });
}
