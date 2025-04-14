import { useSelector } from "react-redux";

function Home() {
  const loggedUser = useSelector((state) => state.auth.loggedInUsers);
  console.log("Currently logged user:", loggedUser);
  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
}

export default Home;
