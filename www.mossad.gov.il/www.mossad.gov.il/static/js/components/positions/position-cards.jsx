import React, { Component } from "react";
import SaveButton from "../general/save";

class PositionsCards extends Component {
  render() {
    const {
      positions,
      preview,
      currentPosition,
      filteredData,
      handleSave,
      savedPositions,
    } = this.props;
    return (
      <div className="position-cards">
        <div className="result-count">
          מציג {positions.length} מתוך {filteredData.length}
        </div>
        <ul>
          {positions.map((position) => (
            <li
              className={
                currentPosition.id === position.id
                  ? "position-card active"
                  : "position-card"
              }
              key={position.id}
              tabIndex="0"
            >
              <div className="card-header">
                <h3>{position.title}</h3>
                <div className="card-actions">
                  <SaveButton
                    position={position}
                    handleSave={handleSave}
                    savedPositions={savedPositions}
                  ></SaveButton>
                  {/* <ShareButton url={"/positions/"+position.id}></ShareButton> */}
                </div>
              </div>
              <div className="card-body">
                <p className="position-description">
                  {position.jobDescription}
                </p>
                <p className="position-includes">{position.jobIncludes}</p>
              </div>
              <div className="card-footer">
                <div className="card-info">
                  <img
                    src={position.department.img}
                    alt={position.department.title}
                  />
                  <span>{position.department.title}</span>
                </div>
                <div className="card-info clock">
                  <img
                    src={process.env.PUBLIC_URL + "/clock.svg"}
                    alt={position.department.title}
                  />
                  <span>{position.positionPrecentage.title}</span>
                </div>
                <button
                  className="show-position"
                  onClick={() => preview(position)}
                >
                  צפייה במשרה
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PositionsCards;
