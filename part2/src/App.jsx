import { useState, useEffect, createContext, useContext } from "react";
import _ from "lodash";
import {
  getNumbers,
  addNumber,
  deleteNumber,
  updateNumber,
} from "./services/numbers";

const Message = () => {
  const { message, error } = useContext(MessageContext);

  if (!message) {
    return null;
  }

  const isError = error ? "error" : "success";

  return <div className={`message ${isError}`}>{message}</div>;
};

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
  const { persons, setPersons } = useContext(PersonsContext);
  const { setMessage, setError } = useContext(MessageContext);

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
        setError(false);
        setMessage(`Successfully deleted ${name} from the database!`);
      } catch (err) {
        console.log(err);
        setError(true);
        setMessage(`Error when deleting ${name} from the database`);
      }
    }
  };

  return <button onClick={handleClick}>Delete</button>;
};

const Numbers = ({ search }) => {
  const { persons } = useContext(PersonsContext);

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
const MessageContext = createContext();

const App = () => {
  const [persons, setPersons] = useState([]);
  const [inputValue, setInputValue] = useState({ name: "", number: "" });
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
      if (
        newPerson.name.toLowerCase() === person.name.toLowerCase() &&
        window.confirm(
          `${newPerson.name} is already in the phonebook. Replace the old phone number with new one?`
        )
      ) {
        try {
          const response = await updateNumber(person.id, newPerson);
          const tempPersons = persons.map((p) => {
            if (p.id === response.id) {
              return response;
            } else {
              return p;
            }
          });

          setPersons(tempPersons);
          setError(false);
          setMessage(`Successfully edited ${response.name}!`);
          setInputValue({
            name: "",
            number: "",
          });
        } catch (err) {
          setError(true);
          setMessage("Errow when updating number");
        } finally {
          return;
        }
      }
    }

    try {
      const response = await addNumber(newPerson);

      setPersons(persons.concat(response));
      setInputValue({
        name: "",
        number: "",
      });
      setError(false);
      setMessage(`Successfully added ${response.name} to the database!`);
    } catch (err) {
      setError(true);
      setMessage("Error when adding number to database");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await getNumbers();
      if (response) {
        setPersons(response);
      }
    } catch (err) {
      setError(true);
      setMessage("Error when getting data the from database");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PersonsContext.Provider value={{ persons, setPersons }}>
        <MessageContext.Provider
          value={{ message, setMessage, error, setError }}
        >
          <h2>Phonebook</h2>
          <Message />
          <Search handleSearch={handleSearch} value={search} />
          <h3>Add New</h3>
          <Form
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            inputValue={inputValue}
          />
          <h2>Numbers</h2>
          <Numbers search={search} />
        </MessageContext.Provider>
      </PersonsContext.Provider>
    </div>
  );
};

export default App;
