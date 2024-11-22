import PropTypes from 'prop-types';

const PersonForm = ({
  id,
  nameValue,
  numberValue,
  nameHandler,
  numberHandler,
  submitHandler,
}) => {
  return (
    <form id={id} onSubmit={submitHandler}>
      <div>
        <label htmlFor="nameInput">
          Name:
          <input id="nameInput" value={nameValue} onChange={nameHandler} />
        </label>
      </div>
      <div>
        <label htmlFor="numberInput">
          Number:
          <input
            id="numberInput"
            value={numberValue}
            onChange={numberHandler}
          />
        </label>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  id: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  numberValue: PropTypes.string.isRequired,
  nameHandler: PropTypes.func.isRequired,
  numberHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default PersonForm;
