import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={`notification ${type === 'success' ? 'success' : 'error'}`}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default Notification;
