import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm, ContactList, Filter } from '../components';

const LS_KEY = 'contacts';

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
    //   выводим в консоль данные до изменения
    // console.log(prevState);
    //   выводим в консоль данные после каких-либо изменений
    //  console.log(this.state);
    const newContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (newContacts !== prevContacts) {
      //  проверка на наличие изменений в state
      // console.log('changed');
      localStorage.setItem(LS_KEY, JSON.stringify(newContacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  addContactToContactBook = value => {
    const newContact = { id: nanoid(), name: value.name, number: value.number };
    // { name, number, id: nanoid() } - добавление нового контакта в массив обьектов
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContactFromContactBook = id => {
    //  console.log('id', id);
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  handleFilter = event => {
    //   выводит в консоль то, что мы ввели в инпут/фильтр
    //  console.log(event.currentTarget.value);
    this.setState({ filter: event.currentTarget.value });
  };

  checkedDupliteName = value =>
    this.state.contacts.some(
      ({ name }) => name.toLowerCase() === value.toLowerCase()
    );

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    //  выводит имя, которое мы ввели в фильтр, и которое совпадает с именем из списка
    const visibleFilter = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <div
        style={{
          padding: '10px',
        }}
      >
        <h2>Phonebook</h2>
        <ContactForm
          dupliteName={this.checkedDupliteName}
          addContact={this.addContactToContactBook}
        />
        <h2>Contacts</h2>
        <Filter value={this.filter} onChange={this.handleFilter} />
        <ContactList
          contacts={visibleFilter}
          deleteContact={this.deleteContactFromContactBook}
        />
      </div>
    );
  }
}
