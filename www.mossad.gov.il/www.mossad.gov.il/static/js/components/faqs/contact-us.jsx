import React from "react";
import Joi from "joi-browser";
import Input from "../inputs/text-input";
import Select from "../inputs/select";
import TextArea from "../inputs/text-area";
import validationErrors from "../../utilities/validation-errors";
import BreadCrumbs from "../general/bread-crumbs";
import getYears, { getDays, getMonths } from "../application/date-mockup";
import { useState, useEffect } from "react";
import getCatalogs from "./../../services/catalogs";
import sendContact from "../../services/send-contact-us";
import ReCAPTCHA from "react-google-recaptcha";
import getContactUsTranslation from "../../services/contact-us-translation";
import getContactUsCatalogs from "./../../services/contact-us-catalogs";

const ContactUs = ({ translation }) => {
  const [form, formChange] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    day: "",
    month: "",
    year: "",
    email: "",
    country: "",
    citizenship: "",
    language: "",
    phone: "",
    notes: "",
  });
  const [errors, errorsChange] = useState({});
  const [ipAddress, setIpAddress] = useState("");
  const [success, successChange] = useState(false);
  const [catalogs, catalogsChange] = useState([]);
  const [cuCatalogs, cuCatalogsChange] = useState([]);
  const [apiError, apiErrorChange] = useState("");
  const [recaptach, changeRecaptch] = useState(false);
  const [data, changeData] = useState({});
  const [breadCrumbs, changeBreadCrumbs] = useState([
    {
      title: "הגשת מועמדות",
      titleEN: "Apply Now",
      link: "/",
    },
  ]);

  useEffect(() => {
    getCatalogs([1], catalogsChange);
    getContactUsTranslation(changeData);
    getContactUsCatalogs(cuCatalogsChange);

    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    updateText();
  }, [data]);

  const updateText = () => {
    return <p dangerouslySetInnerHTML={{ __html: data[translation.lang] }}></p>;
  };

  useEffect(() => {}, [success]);

  let schema = {
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
    fatherName: Joi.string()
      .allow("")
      .regex(
        /^[_A-z\u0590-\u05fe\u0600-\u06FF]*((-|\s)*[_A-z\u0590-\u05fe\u0600-\u06FF])*\s*$/
      )
      .min(2)
      .max(30)
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    day: Joi.string()
      .optional()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    month: Joi.string()
      .optional()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    year: Joi.string()
      .optional()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    email: Joi.string()
      .optional()
      .allow("")
      .email()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    phone: Joi.string()
      .regex(/^\d+$/)
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    subject: Joi.optional().error((errors) =>
      validationErrors(errors, translation.data.FORM.ERRORS)
    ),
    country: Joi.string()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
    citizenship: Joi.optional().error((errors) =>
      validationErrors(errors, translation.data.FORM.ERRORS)
    ),
    language: Joi.optional().error((errors) =>
      validationErrors(errors, translation.data.FORM.ERRORS)
    ),
    notes: Joi.string()
      .required()
      .error((errors) =>
        validationErrors(errors, translation.data.FORM.ERRORS)
      ),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(form, schema, options);
    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const localSchema = { [name]: schema[name] };
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

  const verified = () => {
    sendContact(form, ipAddress, successChange, apiErrorChange);
  };

  const handleChange = ({ currentTarget: input }) => {
    let local_errors = errors;
    const errorMessage = validateProperty(input);
    if (errorMessage) local_errors[input.name] = errorMessage;
    else delete local_errors[input.name];

    let localForm = form;
    form[input.name] = input.value;
    formChange((form) => ({
      ...form,
      ...localForm,
    }));
    errorsChange(errors);
  };

  useEffect(() => {
    window.gtag("event", "form_submit", {
      form_destination: window.location.href,
    });
  }, [success]);

  return (
    <div className="page-content contact-us">
      <BreadCrumbs
        translation={translation}
        breadCrumbsObj={breadCrumbs}
      ></BreadCrumbs>
      <h1>{translation.data.CONTACT_US.TITLE}</h1>
      {data && data.fa ? updateText() : ""}
      <div
        className={!success ? "application-stage" : "application-stage success"}
      >
        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="form-columns">
              <div>
                <h2>{translation.data.CONTACT_US.PERSONAL_INFO}</h2>
                <div className="form-row">
                  <Input
                    name="firstName"
                    label={translation.data.CONTACT_US.FIRST_NAME}
                    required={true}
                    value={form.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  ></Input>
                </div>
                <div className="form-row">
                  <Input
                    name="lastName"
                    label={translation.data.CONTACT_US.LAST_NAME}
                    required={true}
                    value={form.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  ></Input>
                </div>
              </div>
              <div>
                <div className="spacer"></div>
                <div className="form-row">
                  <Input
                    name="fatherName"
                    label={translation.data.CONTACT_US.FATHER_NAME}
                    value={form.fatherName}
                    onChange={handleChange}
                    error={errors.fatherName}
                  ></Input>
                </div>
                <div className="three-columns">
                  <div>
                    <Select
                      name="year"
                      label={translation.data.CONTACT_US.BIRTHDAY}
                      placeholder={translation.data.FORM.YEAR}
                      options={getYears()}
                      onChange={handleChange}
                      error={errors.year}
                      required={true}
                    />
                  </div>
                  <div>
                    <Select
                      name="month"
                      placeholder={translation.data.FORM.MONTH}
                      label=" "
                      options={getMonths()}
                      onChange={handleChange}
                      error={errors.month}
                      required={true}
                    />
                  </div>
                  <div>
                    <Select
                      name="day"
                      placeholder={translation.data.FORM.DAY}
                      label=" "
                      options={getDays()}
                      onChange={handleChange}
                      error={errors.day}
                      required={true}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2>{translation.data.CONTACT_US.CONTACT_INFO}</h2>
                <div className="form-row">
                  <Input
                    name="email"
                    label={translation.data.CONTACT_US.EMAIL}
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                  ></Input>
                </div>
                <div className="form-row">
                  <Input
                    name="phone"
                    label={translation.data.CONTACT_US.PHONE}
                    required={true}
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  ></Input>
                </div>
              </div>
              <div>
                <h2>{translation.data.CONTACT_US.RESI_INFO}</h2>
                <div className="form-row">
                  <Select
                    name="country"
                    required={true}
                    label={translation.data.CONTACT_US.COUNTRY}
                    options={cuCatalogs.countries ? cuCatalogs.countries : []}
                    onChange={handleChange}
                    error={errors.country}
                  ></Select>
                </div>
                <div className="form-row">
                  <Select
                    name="citizenship"
                    label={translation.data.CONTACT_US.CITIZENSHIP}
                    options={cuCatalogs.countries ? cuCatalogs.countries : []}
                    onChange={handleChange}
                    error={errors.citizenship}
                  ></Select>
                </div>
              </div>
              <div>
                <h2>{translation.data.CONTACT_US.ANY_INFO}</h2>
                <div>
                  <Select
                    name="language"
                    required={true}
                    label={translation.data.CONTACT_US.LANGUAGE}
                    options={catalogs.payload ? catalogs.payload[0] : []}
                    onChange={handleChange}
                    error={errors.language}
                  ></Select>
                </div>
                <div>
                  <TextArea
                    name="notes"
                    cols="30"
                    rows="3"
                    required={true}
                    value={form.notes}
                    placeholder={translation.data.CONTACT_US.NOTES_PLACEHOLDER}
                    limit="200"
                    onChange={handleChange}
                    error={errors.notes}
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              {recaptach ? (
                <div className="recapcha">
                  <ReCAPTCHA
                    sitekey="6LehjbMZAAAAAHsywENdjmEJLvhEODgIPWnF2Lyd"
                    onChange={verified}
                  />
                </div>
              ) : null}
              <button type="submit" id="sendCU">
                {translation.data.SEND}
              </button>
              <div className="error-message">{apiError}</div>
            </div>
          </form>
        ) : (
          <React.Fragment>
            <img src="/plane.svg" alt="success plane" />
            <h2>{translation.data.FORM.SUCCESS}</h2>
            <p>{translation.data.FORM.SUCCESS_PARA}</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
