import React, { Component } from "react";
import { Link } from "react-router-dom";
import SaveButton from "../general/save";
import ShareButton from "../general/share";

class Preview extends Component {
  gotToForm() {
    window.location.href = "/application";
  }

  render() {
    const {
      currentPosition,
      filteredData,
      positionNavigation,
      handleSave,
      savedPositions,
      positionStages,
    } = this.props;
    const itemIndex = filteredData.indexOf(
      filteredData.filter((x) => x.id === currentPosition.id)[0]
    );
    return (
      <div className="position-preview">
        <div className="preview-header">
          <h2>{currentPosition.title}</h2>
          <p>{currentPosition.jobDescription}</p>
          <div className="preview-footer">
            <div className="preview-info">
              {currentPosition.department ? (
                <React.Fragment>
                  <img
                    src={currentPosition.department.img}
                    alt={currentPosition.department.title}
                  />
                  <span>{currentPosition.department.title}</span>
                </React.Fragment>
              ) : null}
            </div>
            <div className="preview-info clock">
              {currentPosition.positionPrecentage ? (
                <React.Fragment>
                  <img
                    src={process.env.PUBLIC_URL + "/clock.svg"}
                    alt={currentPosition.department.title}
                  />
                  <span>{currentPosition.positionPrecentage.title}</span>
                </React.Fragment>
              ) : null}
            </div>
            <div className="position-navigation">
              <button
                className={
                  itemIndex === 0
                    ? "previous-position"
                    : "previous-position show"
                }
                onClick={() => positionNavigation(filteredData[itemIndex - 1])}
              >
                <img src={process.env.PUBLIC_URL + "/send-white.svg"} alt="" />
                <span> למשרה הקודמת</span>
              </button>
              <button
                className={
                  itemIndex === filteredData.length - 1
                    ? "next-position"
                    : "next-position show"
                }
                onClick={() => positionNavigation(filteredData[itemIndex + 1])}
              >
                <span> למשרה הבאה </span>
                <img src={process.env.PUBLIC_URL + "/send-white.svg"} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="preview-body">
          <div className="preview-content">
            {currentPosition.jobAssigments &&
            currentPosition.jobAssigments > 0 ? (
              <React.Fragment>
                <h3>משימות התפקיד</h3>
                <ol className="order-list">
                  {currentPosition.jobAssigments.map((assignment, index) => (
                    <li key={index}>{assignment}</li>
                  ))}
                </ol>
              </React.Fragment>
            ) : null}
            <h3>מה אנחנו מחפשים?</h3>
            <div className="looking-for">
              {currentPosition.prerequisite &&
              currentPosition.prerequisite.length > 0 ? (
                <div className="looking-for-section">
                  <h4>תנאי סף</h4>
                  <ul>
                    {currentPosition.prerequisite.map((pre, index) => (
                      <li key={index}>{pre}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {currentPosition.additionalCriteria &&
              currentPosition.additionalCriteria.length > 0 ? (
                <div className="looking-for-section">
                  <h4>קריטריונים נוספים </h4>
                  <ul>
                    {currentPosition.additionalCriteria.map(
                      (cariteria, index) => (
                        <li key={index}>{cariteria}</li>
                      )
                    )}
                  </ul>
                </div>
              ) : null}
              {currentPosition.interpersonalSkills &&
              currentPosition.interpersonalSkills.length > 0 ? (
                <div className="looking-for-section">
                  <h4>כישורים בינאישיים</h4>
                  <ul>
                    {currentPosition.interpersonalSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
          <div className="preview-actions">
            <SaveButton
              position={currentPosition}
              handleSave={handleSave}
              savedPositions={savedPositions}
            ></SaveButton>
            {/* <ShareButton url={"/positions/"+currentPosition.id}></ShareButton> */}
            <button
              onClick={() => {
                handleSave({
                  id: currentPosition.id,
                  name: currentPosition.title,
                });
                this.gotToForm();
              }}
              className="apply"
            >
              הגשת מועמדות
            </button>
          </div>
          {positionStages ? (
            <div className="preview-stages">
              <h3>מה הלאה?</h3>
              <ul className="stages-container">
                {positionStages.map((stage, index) => (
                  <li key={index}>
                    <span className="stage-preview-number">{index + 1}</span>
                    <div className="stage-content">
                      <h4
                        dangerouslySetInnerHTML={{ __html: stage.title }}
                      ></h4>
                      <p>{stage.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="preview-actions mobile">
            <SaveButton
              position={currentPosition}
              handleSave={handleSave}
              savedPositions={savedPositions}
            ></SaveButton>
            <ShareButton url={"/positions/" + currentPosition.id}></ShareButton>
            <Link to="/application" className="apply">
              הגשת מועמדות
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Preview;
