function Unauthorized() {
  return (
    <div className="unauthorized">
      <div className="container">
        <h1>403 - Forbidden</h1>
        <p>You do not have access to this page.</p>
        <button className="btn" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
}
export default Unauthorized;
