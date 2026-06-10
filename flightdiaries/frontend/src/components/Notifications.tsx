const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div style={{ color: "red" }}>
      {message.error.map((e, index: number) => (
        <p key={index}>
          Error ({e.path}) - {e.message}
        </p>
      ))}
    </div>
  );
};

export default Notification;
