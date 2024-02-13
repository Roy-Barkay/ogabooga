import React from "react";
import Input from "../inputs/text-input";
import Select from "../inputs/select";
import TextArea from "../inputs/text-area";
import getYears, { getMonths, getDays } from "./date-mockup";
import ReCAPTCHA from "react-google-recaptcha";
import Upload from "./../inputs/upload";

const ApplicationForm = ({
  errors,
  form,
  handleChange,
  validate,
  addLanguage,
  removeLanguage,
  translation,
  catalogs,
  apiError,
  verified,
  recaptach,
  file,
  handleFileChange,
}) => {
  return (
    <React.Fragment>
      <div className="form-columns">
        <div>
          <h2>{translation.data.FORM.PERSONAL_INFO}</h2>
          <div className="form-row">
            <Input
              name="firstName"
              label={translation.data.FORM.FIRST_NAME}
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required={true}
            />
          </div>
          <div className="form-row">
            <Input
              name="lastName"
              label={translation.data.FORM.LAST_NAME}
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required={true}
            />
          </div>
          <div className="form-row">
            <Input
              name="id"
              label={translation.data.FORM.ID_OR_PASSPORT}
              value={form.id}
              onChange={handleChange}
              error={errors.id}
              required={true}
            />
          </div>
          <div className="form-row three-columns">
            <div>
              <Select
                name="year"
                placeholder={translation.data.FORM.YEAR}
                label={translation.data.FORM.BIRTHDAY}
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
          <h2>{translation.data.FORM.CONTACT_INFO}</h2>
          <div className="form-row">
            <Input
              name="email"
              label={translation.data.FORM.EMAIL}
              onChange={handleChange}
              error={errors.email}
              value={form.email}
              required={true}
            />
          </div>
          <div className="form-row">
            <Input
              name="phone"
              label={translation.data.FORM.PHONE}
              onChange={handleChange}
              error={errors.phone}
              value={form.phone}
              required={true}
            />
          </div>
          <div className="form-row stick-bottom">
            <h2>{translation.data.FORM.HOW_DID_YOU_REACH}</h2>
            <Select
              name="how"
              label={translation.data.FORM.PLEASE_SELECT}
              placeholder={translation.data.FORM.SELECT}
              options={catalogs.payload ? catalogs.payload[1] : []}
              onChange={handleChange}
              error={errors.how}
              required={true}
            />
          </div>
        </div>
        <div>
          <h2>{translation.data.FORM.LANGUAGES}</h2>
          {form.languages.map((language, index) => (
            <div className="form-row langauge" key={index}>
              <div>
                <Select
                  name={"language" + index}
                  placeholder={translation.data.FORM.SELECT}
                  label={translation.data.FORM.LANGUAGE}
                  options={catalogs.payload ? catalogs.payload[0] : []}
                  onChange={handleChange}
                  error={errors.language}
                  defaultOption={language.languageID}
                  required={true}
                />
              </div>
              <div>
                <Select
                  name={"level" + index}
                  placeholder={translation.data.FORM.SELECT}
                  label={translation.data.FORM.LEVEL}
                  options={catalogs.payload ? catalogs.payload[2] : []}
                  onChange={handleChange}
                  error={errors.level}
                  required={true}
                />
              </div>
              {index > 1 ? (
                <button
                  type="button"
                  onClick={(index) => removeLanguage(index)}
                  className="remove-language"
                >
                  <img src="remove.svg" alt="delete language" />
                </button>
              ) : null}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addLanguage(form.languages.length)}
            className="add-language"
          >
            <img src="/add.svg" alt="add" />
            {translation.data.FORM.ADD_LANG}
          </button>
        </div>
        <div className="expanded">
          <h2>{translation.data.FORM.VOLUNTEERING}</h2>
          <Select
            name="volunteered"
            placeholder={translation.data.FORM.SELECT}
            label={translation.data.FORM.PLEASE_SELECT}
            options={catalogs.payload ? catalogs.payload[3] : []}
            onChange={handleChange}
            error={errors.volunteered}
            required={true}
          />
          <div className="form-row">
            <TextArea
              name="notes"
              value={form.notes}
              placeholder={translation.data.FORM.NOTES_PLACEHOLDER}
              rows="10"
              limit="200"
              onChange={handleChange}
            />
          </div>
          <h2>{translation.data.FORM.UPLOAD_CV_TITLE}</h2>
          <Upload
            name="attachment"
            placeholder={translation.data.FORM.UPLOAD_CV}
            value={file}
            label={translation.data.FORM.UPLOAD_CV}
            required={true}
            error={errors.file}
            onChange={handleFileChange}
          />

          <div className="add-file" hidden>
            <button
              id="mybutton"
              dangerouslySetInnerHTML={{
                __html: translation.data.FORM.UPLOAD_CV,
              }}
              className="addFile"
              onClick={(event) => event.preventDefault()}
            ></button>
            <div className="ProgressDIV">
              <div className="Completed" id="Completed1"></div>
            </div>
            <div id="MyControlFileContainer"></div>
            <div id="main1"></div>
          </div>
        </div>
      </div>
      <div className="form-actions">
        {recaptach ? (
          <div className="recapcha">
            <ReCAPTCHA
              ref={(ref) => (recaptach = ref)}
              sitekey="6LehjbMZAAAAAHsywENdjmEJLvhEODgIPWnF2Lyd"
              onChange={verified}
            />
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          {translation.data.CANCEL}
        </button>
        <button type="submit" id="sendButton">
          {translation.data.SEND}
        </button>
        <div className="error-message">{apiError}</div>
      </div>
    </React.Fragment>
  );
};

export default ApplicationForm;
