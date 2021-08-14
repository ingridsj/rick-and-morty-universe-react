import "./index.scss";

import { BiFemaleSign, BiMaleSign } from "react-icons/bi";

export const Card = (props) => {
  const {
    image,
    name,
    gender,
    origin,
    location,
    status,
    species,
    totalViews,
    classNameImg,
  } = props;

  return (
    <div className="Card">
      <div className="first-column">
        <img className={classNameImg} src={image} />
      </div>
      <div className="second-column">
        <h3>
          {name} - {gender === "Female" ? <BiFemaleSign /> : <BiMaleSign />}
        </h3>
        <p>
          {status} - {species}
        </p>
        <span>From:</span>
        <p>{origin}</p>
        <span>Last known location:</span>
        <p>{location}</p>
        <span>
          Total appearances: <strong>{totalViews}</strong>
        </span>
      </div>
    </div>
  );
};
