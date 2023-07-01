import { useState } from 'react';
import { nanoid } from 'nanoid';

import css from 'components/form/form.module.css';
import { useContacts } from 'redux/contacts/useContacts';

export const Form = () => {
  const { contacts, addContact } = useContacts();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    const existContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    addContact({ id: nanoid(), name, number });

    reset();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const nameId = nanoid();
  const numberId = nanoid();

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a\-\zA\-\Zа\-\яА\-\Я]+(([' \-\][a\-\zA\-\Zа\-\яА\-\Я ])?[a\-\zA\-\Zа\-\яА\-\Я]*)*$"
          title="Назва може містити лише літери, апостроф, тире та пробіли. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameId}
          value={name}
          onChange={handleChange}
        />
      </label>

      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-\.\s]?\(?\d{1,3}?\)?[\-\.\s]?\d{1,4}[\-\.\s]?\d{1,4}[\-\.\s]?\d{1,9}"
          title="Номер телефону має складатися з цифр і може містити пробіли, тире, круглі дужки та починатися з +"
          required
          id={numberId}
          value={number}
          onChange={handleChange}
        />
      </label>

      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;
