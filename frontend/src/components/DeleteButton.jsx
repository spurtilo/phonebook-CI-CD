import PropTypes from 'prop-types';

const DeleteButton = ({ personId, name, deleteHandler }) => {
  return (
    <button type="button" onClick={() => deleteHandler(personId, name)}>
      Delete
    </button>
  );
};

DeleteButton.propTypes = {
  personId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default DeleteButton;
