import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ flag, name, population, region, capital , link }) => {
  const navigate = useNavigate()

  const handleClick =() => {
    navigate(link)
  }
  
  return (
    <div className="p-10 cursor-pointer" onClick={()=>handleClick()}>
    <div className=" dark:bg-dark-blue rounded-lg overflow-hidden shadow-lg ">
      <img className="w-full h-48 object-cover" src={flag} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          <span>{name}</span>
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
