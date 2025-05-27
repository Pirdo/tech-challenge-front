import PostsList from "../components/PostsList";
import MainHeader from "../components/MainHeader";
import "./Posts.css";
import { useEffect, useState } from "react";
import Admin from "./Admin";
import { api } from "../services/api";
import NewPost from "./NewPost";

function Posts() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isModalEnabled, setIsModalEnabled] = useState(false);

  async function getPosts() {
    await api.get("/posts/").then((res) => {
      console.log(res.data.data);
      setPosts(res.data.data);
    });
  }

  useEffect(() => {
    getPosts();
  }, [isAdmin]);

  return (
    <>
      <div className="main-view">
        <MainHeader
          setIsAdmin={setIsAdmin}
          setIsModalEnabled={setIsModalEnabled}
        />
        {isModalEnabled && (
          <NewPost isModalEnabled={setIsModalEnabled} refreshPosts={getPosts} type={"create"} />
        )}
        <main>{!isAdmin ? <PostsList posts={posts} /> : <Admin />}</main>
      </div>
    </>
  );
}

export default Posts;
