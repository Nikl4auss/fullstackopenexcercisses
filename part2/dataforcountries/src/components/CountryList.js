import React, { useState } from "react";
import Country from "./Country";

const CountryList = ({ filteredList }) => {
  return (
    <div className="countrie-list">
      <h1>Countries:</h1>
      {filteredList.length === 0 ? (
        <p>Start writing a filter in the input box </p>
      ) : filteredList.length > 10 ? (
        <p>To many countries, be more specific</p>
      ) : filteredList.length <= 10 && filteredList.length > 1 ? (
        filteredList.map((country) => {
          const { name, capital, population, languages, flag } = country;

          return (
            <Country
              key={name}
              name={name}
              capital={capital}
              population={population}
              languages={languages}
              flag={flag}
              hasButton={true}
            />
          );
        })
      ) : (
        filteredList.map((country) => {
          const { name, capital, population, languages, flag } = country;
          return (
            <Country
              key={name}
              name={name}
              capital={capital}
              population={population}
              languages={languages}
              flag={flag}
              hasButton={false}
            />
          );
        })
      )}
    </div>
  );
};

export default CountryList;
