import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormSlyled,
  Label,
  Button,
  ErrMessage,
  StyledInput,
} from './FormStyled.styled';

const phoneRegExp =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const validationSchemeForm = yup.object().shape({
  name: yup
    .string()
    .required(
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: yup
    .string()
    .matches(
      phoneRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const ContactForm = ({ addContact, dupliteName }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const handleContactFormSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    dupliteName(values.name)
      ? alert(`${values.name} is already in contacts`)
      : addContact(values);
    // values - собирает значения инпутов, далее в {actions} можно просмотреть все
    //  возможные методы для формы

    //  console.log(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemeForm}
      onSubmit={handleContactFormSubmit}
    >
      <FormSlyled>
        <div>
          <Label htmlFor="name">
            Name
            <StyledInput
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
            />
            <ErrMessage component="div" name="name" />
          </Label>
          <Label htmlFor="number">
            Number
            <StyledInput
              type="tel"
              name="number"
              id="number"
              placeholder="Enter your phone number"
            />
            <ErrMessage component="div" name="number" />
          </Label>
        </div>
        <Button type="submit">Add contact</Button>
      </FormSlyled>
    </Formik>
  );
};

export default ContactForm;
