import { useState } from "react";
import _ from "lodash";

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search For:{" "}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <h3>Add New</h3>
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
      <h2>Numbers</h2>
      {persons.map((person) => {
        const testName = person.name.toLowerCase();
        if (!testName.includes(search.toLowerCase())) {
          return null;
        }
        return (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default App;
