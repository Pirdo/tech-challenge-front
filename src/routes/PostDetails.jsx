import classes from "./PostDetails.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdMessage } from "react-icons/md";
import { api } from "../services/api";

function PostDetails() {
  let { id } = useParams();
  const [post, setPost] = useState("");

  const navigate = useNavigate();

  async function getPostById() {
    await api.get(`posts/getOne/${id}`).then((res) => {
      console.log(res.data.data);
      setPost(res.data.data);
    });
  }

  useEffect(() => {
    getPostById();
  }, []);


  return (
    <>
      <div className="main-view">
        <header className={classes.header}>
          <h1 className={classes.logo}>
            <MdMessage />
            Posts
          </h1>
          <p>
            <button
              className={classes.button}
              onClick={() => navigate("/home")}
            >
              Voltar
            </button>
          </p>
        </header>
        <main className={classes.details}>
          <p className={classes.author}>{post.autor}</p>
          <p className={classes.author}>{post.titulo}</p>
          <p className={classes.text}>{post.conteudo}</p>
        </main>
      </div>
    </>
  );
}

export default PostDetails;
