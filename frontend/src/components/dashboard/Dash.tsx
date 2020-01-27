import React from "react";
import {Button, ButtonType, ButtonSize} from "../userInterface/button/Button";
import {localization} from "../../services/clientWorkers/LocalizationService";
import {Link} from 'react-router-dom';
// @ts-ignore
import courseImage from "../../../assets/images/courseImage.png";

interface DashProps {
  courseName: string;
  pollGuid: string;
}

export function Dash(props: DashProps) {
 return (
    <div className="dash">
      <h3>{props.courseName}</h3>
      <img src={courseImage} />
      <div className="courseDashBottom">
        <div className="rightBlock">
          <p>
            <Link to = {"/poll?guid=" + props.pollGuid}>
              <Button
                type = {ButtonType.orange}
                size = {ButtonSize.small}
                text = {localization.editPoll()}
                handler = {() => {setTimeout(() => window.location.reload(), 0)}}
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
