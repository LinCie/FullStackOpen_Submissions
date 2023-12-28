import { useEffect, useState } from "react";
import { getCountries } from "./services/country";

const Search = ({ value, handleSearch }) => {
  return (
    <div>
      Search for: <input value={value ? value : ""} onChange={handleSearch} />
    </div>
  );
};

const CountryInfo = ({ country }) => {
  const languages = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.official}</h1>
      {country.capital.map((capital) => {
        return <div key={capital}>Capital: {capital}</div>;
      })}
      <div>Area: {country.area}</div>
      <div>Languages:</div>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`${country.name.common}'s flag`}
        width={500}
        height={300}
      />
    </div>
  );
};

const SearchResult = ({ countries, handleClick }) => {
  if (countries?.length === 1) {
    return <CountryInfo country={countries[0]} />;
  } else if (countries?.length > 10) {
    return <div>Too many match!</div>;
  } else {
    return countries?.map((country) => {
      const countryName = country.name.common;
      return (
        <div key={countryName}>
          {countryName}{" "}
          <button value={countryName} onClick={handleClick}>
            Show
          </button>
        </div>
      );
    });
  }
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState(null);
  const [searchedCountries, setSearchedCountries] = useState(null);
  const [shownCountry, setShownCountry] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response);
    } catch (err) {
      alert("Error fetching countries");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    if (shownCountry) {
      setShownCountry(null);
    }

    setSearch(e.target.value);
    const temp = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(e.target.value.toLowerCase());
    });
    setSearchedCountries(temp);
  };

  const handleCountryShown = (e) => {
    const temp = countries.find(
      (country) => country.name.common === e.target.value
    );
    setShownCountry(temp);
  };

  return (
    <div>
      <Search value={search} handleSearch={handleSearch} />
      {shownCountry ? (
        <CountryInfo country={shownCountry} />
      ) : (
        <SearchResult
          countries={searchedCountries}
          handleClick={handleCountryShown}
        />
      )}
    </div>
  );
};

export default App;
