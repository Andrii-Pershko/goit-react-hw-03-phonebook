import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contactsData = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  handleChangeFilter = e => {
    this.setState(prevState => ({
      filter: e.target.value,
    }));
  };

  addContacts = (id, name, number) => {
    if (
      this.state.contacts.find(contact => contact.name === name) !== undefined
    ) {
      Notiflix.Notify.failure(`${name} already in your contact book`);
      return;
    }

    const newContact = { id, name, number };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
    Notiflix.Notify.success(`You add ${name} to phonebook`);
  };

  visibleContacts = () => {
    const filterNormalize = this.state.filter.toLowerCase();
    const visibleContacts = this.state.filter
      ? this.state.contacts.filter(contact =>
          contact.name.toLocaleLowerCase().includes(filterNormalize)
        )
      : this.state.contacts;
    return visibleContacts;
  };

  handleDeleteContact = e => {
    const deleteSelectContact = this.state.contacts.filter(
      contact => contact.id !== e.target.id
    );

    this.setState(prevState => ({
      contacts: [...deleteSelectContact],
    }));
  };

  render() {
    const { addContacts, handleChangeFilter, visibleContacts } = this;
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContacts}></ContactForm>
        <h2>Contacts</h2>
        <Filter onChange={handleChangeFilter} />
        <ContactList
          contactList={visibleContacts()}
          onChange={this.handleDeleteContact}
        />
      </>
    );
  }
}
