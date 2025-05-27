import { Routes, Route } from "react-router-dom";
import Posts from "./routes/Posts";
import PostDetails from "./routes/PostDetails";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="home" element={<Posts />} />
        <Route path="home/:id" element={<PostDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
