import { NavLink } from "react-router-dom";

function ListedItems({ el, handleRemove, basePath }) {
  return (
    <div key={el.id}>
      <NavLink to={`/explore/${basePath}/${el.id}`}>
        <p className="card-title">{el.title}</p>
      </NavLink>{" "}
      <span onClick={() => handleRemove(el)} className="remove">
        X
      </span>
    </div>
  );
}

export default ListedItems;
