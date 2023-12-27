import { useState, useEffect, createContext, useContext } from "react";
import _ from "lodash";
import { getNumbers, addNumber, deleteNumber } from "./services/numbers";

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

const DeleteButton = ({ id, name }) => {
  const persons = useContext(PersonsContext);
  const setPersons = useContext(SetPersonsContext);

  const handleClick = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name} from the database?`
      )
    ) {
      try {
        await deleteNumber(id);

        const newPersons = persons.filter((p) => p.id !== id);
        setPersons(newPersons);
      } catch (err) {
        alert(`Error when deleting ${name} from the database`);
      }
    }
  };

  return <button onClick={handleClick}>Delete</button>;
};

const Numbers = ({ search }) => {
  const persons = useContext(PersonsContext);

  return persons.map((person) => {
    const testName = person.name.toLowerCase();
    if (!testName.includes(search.toLowerCase())) {
      return null;
    }

    return (
      <div key={person.id}>
        {person.name} {person.number}{" "}
        <DeleteButton id={person.id} name={person.name} />
      </div>
    );
  });
};

const PersonsContext = createContext();
const SetPersonsContext = createContext();

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
      <PersonsContext.Provider value={persons}>
        <SetPersonsContext.Provider value={setPersons}>
          <h2>Phonebook</h2>
          <Search handleSearch={handleSearch} value={search} />
          <h3>Add New</h3>
          <Form
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            inputValue={inputValue}
          />
          <h2>Numbers</h2>
          <Numbers search={search} />
        </SetPersonsContext.Provider>
      </PersonsContext.Provider>
    </div>
  );
};

export default App;
