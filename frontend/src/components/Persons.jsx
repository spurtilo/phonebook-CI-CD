import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import Header from './Header';

const Person = ({ person, deleteHandler }) => {
  return (
    <div className="personListItem">
      <div>{`${person.name} ${person.number}`}</div>
      <div>
        <DeleteButton
          personId={person.id}
          name={person.name}
          deleteHandler={deleteHandler}
        />
      </div>
    </div>
  );
};

const Persons = ({ persons, deleteHandler }) => {
  return persons.map((person) => (
    <>
      <Header text="Numbers" />
      <Person key={person.name} person={person} deleteHandler={deleteHandler} />
    </>
  ));
};

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  deleteHandler: PropTypes.func.isRequired,
};
Persons.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Persons;
