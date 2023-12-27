import { useState, useEffect } from "react";
import _ from "lodash";
import { getNumbers, addNumber } from "./services/numbers";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPerson = {
      ...inputValue,
    };

    for (const person of persons) {
      if (_.isEqual(newPerson, person)) {
        alert(`${newPerson.name} is already added to phonebook`);
        return;
      }
    }

    try {
      await addNumber(newPerson);

      setPersons(persons.concat(newPerson));
      setInputValue({
        name: "",
        number: "",
      });
    } catch (err) {
      alert("Error when adding number to database");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async () => {
    try {
      const data = await getNumbers();
      if (data) {
        setPersons(data);
      }
    } catch (err) {
      alert("Error when getting data the from database");
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
