import axios from "axios";
import { useState, useEffect } from "react";

const Country = ({ name, capital, population, languages, flag, hasButton }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  if (!hasButton) {
    return (
      <>
        <h2>{name}</h2>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <h2>languages: </h2>
        <ul>
          {languages.map((language) => {
            return <li key={language.name}>{language.name}</li>;
          })}
        </ul>
        <img src={flag} alt="" />
      </>
    );
  }
  return (
    <>
      {showDetails ? (
        <>
          <h2>{name}</h2>
          <p>Capital: {capital}</p>
          <p>Population: {population}</p>
          <h2>languages: </h2>
          <ul>
            {languages.map((language) => {
              return <li key={language.name}>{language.name}</li>;
            })}
          </ul>
          <img src={flag} alt="" />
        </>
      ) : (
        <p>{name}</p>
      )}
      {hasButton ? (
        <button onClick={handleClick}>{showDetails ? "hide" : "show"}</button>
      ) : null}
    </>
  );
};

export default Country;
