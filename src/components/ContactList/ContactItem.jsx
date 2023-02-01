import { Button } from '../Form/FormStyled.styled';

const ContactItem = ({ name, number, deleteContact, id }) => {
  const deleteContactFromContactBook = () => {
    deleteContact(id);
  };
  return (
    <li>
      <span>
        {name}: {number}
      </span>
      <Button type="button" onClick={deleteContactFromContactBook}>
        Delete
      </Button>
    </li>
  );
};

export default ContactItem;
