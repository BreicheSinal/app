import "./styles/App.css";
import "./styles/utilities.css";
import "./styles/colors.css";

import Card from "./components/CustomCard";

const App = () => {
  return (
    <div>
      <Card width={250} height={100} />
    </div>
  );
};

export default App;
