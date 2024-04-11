import React, { Component } from 'react';
import styles from './ContactBook.module.css';
import { nanoid } from 'nanoid';

class ContactBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      name: '',
      number: '',
      filter: '',
    };
  }
  loginInputId = nanoid();

  handleChangeName = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeNumber = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number, contacts } = this.state;

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleDeleteContacts = event => {
    const id = event.target.dataset.id;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleChangeFilter = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  render() {
    const { name, number, contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div className={styles.contactBook}>
        <h2>Phonebook</h2>
        <div>
          <form className={styles.formContact} onSubmit={this.handleSubmit}>
            <label className={styles.name}>
              Name
              <input
                className={styles.inputName}
                type="text"
                name="name"
                pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={this.handleChangeName}
              />
            </label>
            <label className={styles.number}>
              Number
              <input
                className={styles.inputNumber}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={this.handleChangeNumber}
              />
            </label>
            <button type="submit" className={styles.addContactBtn}>
              Add contact
            </button>
          </form>
          <h2>Contacts</h2>
          <form>
            <label className={styles.findContact}>
              Find contacts by name
              <input
            
                type="text"
                name="filter"
                value={filter}
                onChange={this.handleChangeFilter}
                placeholder="Search contacts"
                className={styles.filterInput}
              />
            </label>
          </form>

          <ul className={styles.contactItem}>
            {filteredContacts.map(contact => (
              <li key={contact.id} className={styles.item}>
                {contact.name}: {contact.number}
                <button
                  onClick={this.handleDeleteContacts}
                  data-id={contact.id}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ContactBook;
