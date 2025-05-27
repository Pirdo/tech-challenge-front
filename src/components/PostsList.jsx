
import Post from "./Post";
import classes from "./PostsList.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

function PostsList({ posts }) {
  const [search, setsearch] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <div className={classes.search}>
        <input
          type="text"
          className={classes.input}
          placeholder="Buscar post"
          onChange={(e) => setsearch(e.target.value)}
        />
        <button
          className={classes.button}
          onClick={() => {
            api.get(`posts/search?keyword=${search}`).then((response) => {
              setPosts(response.data.data);
              setsearch("");
            });
          }}
        >
          Buscar
        </button>
      </div>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <li onClick={() => navigate(`/home/${post.id}`)}>
              <Post
                key={post.id}
                id={post.id}
                author={post.autor}
                title={post.titulo}
                body={post.conteudo}
              />
            </li>
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>Ainda não existe nenhum post.</h2>
        </div>
      )}
    </>
  );
}

export default PostsList;
