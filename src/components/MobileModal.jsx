function MobileModal({ children }) {
  return (
    <>
      <div id="myModal" className="mob-modal">
        {/* <!-- Modal content --> */}

        <div className="mob-modal-content"> {children}</div>
      </div>
    </>
  );
}

export default MobileModal;
