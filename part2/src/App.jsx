import { useState } from "react";
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
