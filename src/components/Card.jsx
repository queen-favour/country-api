import React from "react";
import { Link } from "react-router-dom";

const Card = ({ flag, name, population, region, capital , link }) => {
  return (
    <div className="p-10 ">
    <div className="max-w-sm dark:bg-dark-blue rounded-lg overflow-hidden shadow-lg ">
      <img className="w-full h-48 object-cover" src={flag} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          <Link to={link}>{name}</Link>
        </div>
        <div>
            <p className="font-semibold">Population: <span className="font-normal">{population}</span></p>
            <p className="font-semibold">Region: <span className="font-normal">{region}</span></p>
            <p className="font-semibold">Capital :<span className="font-normal">{capital}</span></p>
        </div>
   
      </div>
    </div>
    </div>
  );
};

export default Card;
