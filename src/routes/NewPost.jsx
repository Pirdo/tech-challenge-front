import { Link, Form, redirect } from "react-router-dom";

import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { Button } from "@carbon/react";
import { api } from "../services/api";

function NewPost({ isModalEnabled, refreshPosts, post, type }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");

  console.log(post);
  async function onHandleSubmit(e) {
    isModalEnabled(false);
    e.preventDefault();
    if (type == "create") {
      await api
        .post("/posts/create", {
          titulo: title,
          autor: author,
          conteudo: body,
        })
        .then((res) => {
          console.log(res);
          refreshPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await api
        .put(`/posts/edit/${id}`, {
          autor: author,
          titulo: title,
          conteudo: body,
        })
        .then((res) => {
          console.log(res.data);
          refreshPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    if (type === "edit" && post) {
      setTitle(post.titulo);
      setAuthor(post.autor);
      setBody(post.conteudo);
      setId(post.id);
    }
  }, [post, type]);

  console.log(post);
  return (
    <Modal>
      <form method="post" className={classes.form} onSubmit={onHandleSubmit}>
        {type == "create" ? (
          <>
            <p>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="author"
                required
                onChange={(e) => setAuthor(e.target.value)}
              />{" "}
              <label htmlFor="name">Titulo</label>
              <input
                type="text"
                id="name"
                name="tiulo"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="body">Conteudo</label>
              <textarea
                id="body"
                name="body"
                required
                rows={3}
                onChange={(e) => setBody(e.target.value)}
              />
            </p>
            <p className={classes.actions}>
              <Button type="button" onClick={() => isModalEnabled(false)}>
                Cancel
              </Button>
              <button>Submit</button>
            </p>
          </>
        ) : (
          <>
            <p>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="author"
                value={author}
                required
                onChange={(e) => setAuthor(e.target.value)}
              />
              <label htmlFor="name">Titulo</label>
              <input
                type="text"
                id="name"
                name="titulo"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="body">Conteudo</label>
              <textarea
                id="body"
                name="body"
                required
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </p>
            <p className={classes.actions}>
              <Button type="button" onClick={() => isModalEnabled(false)}>
                Cancel
              </Button>
              <button>Submit</button>
            </p>
          </>
        )}
      </form>
    </Modal>
  );
}

export default NewPost;
