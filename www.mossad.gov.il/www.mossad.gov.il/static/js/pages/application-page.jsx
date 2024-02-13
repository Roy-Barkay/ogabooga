import React from "react";
import { useState, useEffect } from "react";
import BreadCrumbs from "../components/general/bread-crumbs";
import ApplicationForm from "../components/application/application-form";
import validationErrors from "../utilities/validation-errors";
import Joi from "joi-browser";
import getCatalogs from "./../services/catalogs";
import sendApplication from "../services/send-application";
import { getApplicationPageData } from "./application-mockups/domains-page-mockup";
import { Link } from "react-router-dom";
import LoaderPopup from "../components/general/loader";
import MD5Compiler from "../services/md5";
import TagManager from "react-gtm-module";

const ApplicationPage = ({
  translation,
  savedPositions,
  clearSavedPosition,
}) => {
  const [pageData, pageDataChange] = useState({});
  const [form, formChange] = useState({
    how: "",
    firstName: "",
    lastName: "",
    id: "",
    year: "",
    month: "",
    day: "",
    email: "",
    phone: "",
    volunteered: "",
    notes: "",
    languages: new Array({ languageID: "he", languageLevelID: "" }),
  });

  const [positions, changePositions] = useState([]);
  const [file, changeFile] = useState([]);
  const [errors, errorsChange] = useState({});
  const [success, successChange] = useState(false);
  const [loaded, loadedChange] = useState(false);
  const [catalogs, catalogsChange] = useState({});
  const [recaptach, changeRecaptch] = useState(false);
  const [apiError, apiErrorChange] = useState("");
  const [breadCrumbs, changeBreadCrumbs] = useState([
    {
      title: "הגשת מועמדות",
      titleEN: "Apply Now",
      link: "/",
    },
  ]);

  let schema = {
    how: Joi.string()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    firstName: Joi.string()
      .required()
      .regex(
        /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
      )
      .min(2)
      .max(30)
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    lastName: Joi.string()
      .required()
      .regex(
        /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
      )
      .min(2)
      .max(30)
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    id: Joi.string()
      .regex(/^[0-9]*$/)
      .min(8)
      .max(9)
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    year: Joi.string()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    month: Joi.string()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    day: Joi.string()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    email: Joi.string()
      .email()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    phone: Joi.string()
      .required()
      .regex(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    volunteered: Joi.string()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    languages: Joi.array().items(
      Joi.object({
        languageID: Joi.string()
          .required()
          .error((errors) =>
            validationErrors(errors, translation.data.FORM.ERRORS)
          ),
        languageLevelID: Joi.string()
          .required()
          .error((errors) =>
            validationErrors(errors, translation.data.FORM.ERRORS)
          ),
      })
    ),
    notes: Joi.string()
      .allow("")
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
  };

  let languageSchema = {
    languageID: Joi.string()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    languageLevelID: Joi.string()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
  };

  const handleAddLanguage = () => {
    let localForm = form;
    localForm.languages.push({ languageID: "", languageLevelID: "" });
    formChange((form) => ({
      ...form,
      ...localForm,
    }));
  };

  useEffect(() => {
    pageDataChange((pageData) => ({
      ...pageData,
      ...getApplicationPageData(),
    }));
    getCatalogs([1, 2, 3, 5], catalogsChange);
  }, []);

  useEffect(() => {
    if (catalogs.payload && catalogs.payload.length > 0) {
      loadedChange(true);
    }
  }, [catalogs]);

  useEffect(() => {
    if (success) {
      clearSavedPosition();
      window.gtag("event", "form_submit", {
        form_destination: window.location.href,
      });
    }
  }, [success]);

  //למחוק

  const handleRemoveLanguage = (index) => {
    let localForm = form;
    localForm.languages.splice(index, 1);
    formChange((form) => ({
      ...form,
      ...localForm,
    }));
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(form, schema, options);
    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const UseIdCardValidation = (id) => {
    var id = String(id).trim();
    if (id.length > 9 || id.length < 9 || isNaN(id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return (
      Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) %
        10 ===
      0
    );
  };

  const validateProperty = ({ name, value }) => {
    let obj = { [name]: value };
    let localSchema = {};
    localSchema = { [name]: schema[name] };
    if (name.includes("language")) {
      localSchema = { ["languageID"]: languageSchema["languageID"] };
      obj = { languageID: value };
    }
    if (name.includes("level")) {
      localSchema = { ["languageLevelID"]: languageSchema["languageLevelID"] };
      obj = { languageLevelID: value };
    }

    const { error } = Joi.validate(obj, localSchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    errorsChange(errors || {});
    if (errors) return;
    changeRecaptch(true);
  };

  const verified = async (value) => {
    let recaptchaResponse = value;
    let localForm = form;
    let hash = await MD5Compiler(file[0]);
    localForm["attachedPosition"] = savedPositions;
    localForm.languages.forEach(
      (lang) =>
        (lang["languageName"] = catalogs.payload[0].filter(
          (x) => x.id === lang.languageID
        )[0].value)
    );
    sendApplication(
      localForm,
      file,
      hash,
      recaptchaResponse,
      successChange,
      apiErrorChange
    );
  };

  const handleChange = ({ currentTarget: input }) => {
    let local_errors = errors;
    const errorMessage = validateProperty(input);
    if (errorMessage) local_errors[input.name] = errorMessage;
    else delete local_errors[input.name];
    let localForm = form;
    if (input.name.includes("language") || input.name.includes("level")) {
      let index = input.name.charAt(input.name.length - 1);
      let field = input.name.includes("language")
        ? "languageID"
        : "languageLevelID";
      localForm.languages[index][field] = input.value;
    } else if (input.name === "id") {
      let checkID = UseIdCardValidation(input.value);
      checkID
        ? delete local_errors[input.name]
        : (local_errors[input.name] = translation.data.FORM.ERRORS.ID);
      localForm[input.name] = input.value;
    } else {
      localForm[input.name] =
        input.name === "file" ? input.files[0] : input.value;
    }
    formChange((form) => ({
      ...form,
      ...localForm,
    }));
    errorsChange(errors);
  };

  const handleFileChange = (file) => {
    if (file.target.files[0].size < 3145728) {
      changeFile([...file.target.files]);
      let localErrors = errors;
      delete localErrors.file;
      formChange((errors) => ({
        ...errors,
        ...localErrors,
      }));
    } else {
      let localErrors = errors;
      localErrors.file = "הקובץ גדול מידי";
      formChange((errors) => ({
        ...errors,
        ...localErrors,
      }));
    }
  };

  return (
    <div className="page-content application-page">
      <BreadCrumbs
        translation={translation}
        breadCrumbsObj={breadCrumbs}
      ></BreadCrumbs>
      <h1>{translation.lang === "he" ? pageData.title : pageData.titleEN}</h1>
      <p>
        {translation.lang === "he" ? pageData.paragraph : pageData.paragraphEN}
      </p>
      <div
        className={!success ? "application-stage" : "application-stage success"}
      >
        {!success ? (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <ApplicationForm
              form={form}
              errors={errors}
              handleChange={handleChange}
              validate={validate()}
              addLanguage={handleAddLanguage}
              removeLanguage={handleRemoveLanguage}
              translation={translation}
              catalogs={catalogs}
              apiError={apiError}
              verified={verified}
              recaptach={recaptach}
              file={file}
              handleFileChange={handleFileChange}
            ></ApplicationForm>
          </form>
        ) : (
          <React.Fragment>
            <img src="plane.svg" alt="success plane" />
            <h2>{translation.data.FORM.SUCCESS}</h2>
            <p>{translation.data.FORM.SUCCESS_PARA}</p>
            <Link className="form-back" to="/">
              {translation.data.FORM.BACKHOME}
            </Link>
          </React.Fragment>
        )}
      </div>
      <button onClick={verified}></button>
      {!loaded ? <LoaderPopup /> : null}
    </div>
  );
};

export default ApplicationPage;
