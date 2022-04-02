import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import './App.css';
import { Contacts } from "./components/Contacts/Contacts.jsx";
import { Filter } from "./components/Filter/Filter.jsx";
import { Form } from './components/Form/Form.jsx';

function App() {
  const [contacts, setContacts,] = useState([])
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => { 
    if (localStorage.getItem("contacts")) { 
      setContacts( JSON.parse(localStorage.getItem("contacts")))
    }
  }, [])
  
  useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])
  

  const handleChange = (e) => {
    setSearchFilter(e.target.value)
  }

  const forSubmit = obj => { 
    const findContact = contacts.find(contact => {
      return contact.name === obj.name;
    })
    if (findContact) {
      return alert (`${obj.name} is already in phonebook`)
    }
    setContacts([{ id: nanoid() , ...obj}, ...contacts ])
    }
  
  const contactsFilter = () => {
    const filterValue = searchFilter.toLocaleLowerCase()
    return contacts.filter(contact => { 
      return contact.name.toLocaleLowerCase().includes(filterValue)
    })
  };
  const deleteContact = e => {
    return setContacts(() => { 
      return contacts.filter(contact => {
        return contact.id !== e.target.parentNode.id;
      })
    })
  };

    return (
      <div className="App">
        <div>
          <h2>PhoneBook</h2>
          <Form onSubmit={ forSubmit }/>
        </div>
        <div>
          <h2>Contacts</h2>
          <Filter
            value={searchFilter}
            onChange={handleChange}
          />
          <Contacts
            names={contactsFilter} onClick={ deleteContact }
          />
        </div>
      </div>
    )
}

export default App;
