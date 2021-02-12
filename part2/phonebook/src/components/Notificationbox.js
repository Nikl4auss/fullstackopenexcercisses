const Notificationbox = ({ message, type }) => {
  return (
    <>
      {message === null ? null : (
        <div className={`notification-box ${type}`}>
          <h3> {message}</h3>
        </div>
      )}
    </>
  );
};

export default Notificationbox;
