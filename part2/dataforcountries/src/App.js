import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState("");

  const handleClick = () => {
    let filtered = countries.filter((countrie) => {
      return countrie.name.includes(filter);
    });
    setFilteredList(filtered);
    setFilter("");
  };
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        const countriesList = response.data;
        return countriesList;
      })
      .then((countriesList) => setCountries(countries.concat(countriesList)));
  }, []);
  return (
    <>
      <Filter
        handleChange={handleChange}
        handleClick={handleClick}
        filter={filter}
      />
      <CountryList filteredList={filteredList} />
    </>
  );
};

export default App;
