import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

const Search = ({ handleSearch, value }) => {
  return (
    <div>
      Search For: <input onChange={handleSearch} value={value} />
    </div>
  );
};

const Form = ({ handleSubmit, handleInputChange, inputValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name:{" "}
        <input
          name="name"
          value={inputValue.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        Number:{" "}
        <input
          name="number"
          value={inputValue.number}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Numbers = ({ persons, search }) => {
  return persons.map((person) => {
    const testName = person.name.toLowerCase();
    if (!testName.includes(search.toLowerCase())) {
      return null;
    }

    return (
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    );
  });
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [inputValue, setInputValue] = useState({ name: "", number: "" });
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      ...inputValue,
      id: [...persons].pop().id + 1,
    };
    for (const person of persons) {
      if (_.isEqual(newPerson, person)) {
        alert(`${newPerson.name} is already added to phonebook`);
        return;
      }
    }
    setPersons(persons.concat(newPerson));
    setInputValue({
      name: "",
      number: "",
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/persons");
      if (response.data) {
        setPersons(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearch={handleSearch} value={search} />
      <h3>Add New</h3>
      <Form
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />
      <h2>Numbers</h2>
      <Numbers search={search} persons={persons} />
    </div>
  );
};

export default App;
