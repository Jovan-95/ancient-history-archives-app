function ListedItems({ el, handleRemove }) {
  return (
    <div key={el.id}>
      <p className="card-title"> {el.title} </p>
      <button onClick={() => handleRemove(el)} className="btn btn--cta">
        Remove from bookmarks
      </button>
    </div>
  );
}

export default ListedItems;
