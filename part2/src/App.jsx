import { useState } from "react";
import _ from "lodash";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "123-456-789" },
  ]);
  const [inputValue, setInputValue] = useState({ name: "", number: "" });

  const handleInputChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const person of persons) {
      if (_.isEqual(inputValue, person)) {
        alert(`${inputValue.name} is already added to phonebook`);
        return;
      }
    }
    setPersons(persons.concat(inputValue));
    setInputValue({
      name: "",
      number: "",
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            name="name"
            value={inputValue.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          number:{" "}
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
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
