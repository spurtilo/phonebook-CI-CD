import PropTypes from 'prop-types';

const Filter = ({ id, value, eventHandler }) => {
  return (
    <>
      <label htmlFor={id}>Filter shown with: </label>
      <input id={id} value={value} onChange={eventHandler} />
    </>
  );
};

Filter.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  eventHandler: PropTypes.func.isRequired,
};

export default Filter;
