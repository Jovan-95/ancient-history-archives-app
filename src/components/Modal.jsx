function Modal({ children }) {
  return (
    <>
      {/* <button id="myBtn">Open Modal</button> */}

      <div id="myModal" className="modal">
        {/* <!-- Modal content --> */}
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
}

export default Modal;
