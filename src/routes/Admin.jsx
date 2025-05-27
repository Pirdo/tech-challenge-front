import PostsList from "../components/PostsList";
import MainHeader from "../components/MainHeader";
import "./Posts.css";
import "./Admin.css";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import NewPost from "./NewPost";

function Admin() {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isModalEnabled, setIsModalEnabled] = useState(false);
  const [editFormData, setEditFormData] = useState({
    autor: "",
    titulo: "",
    conteudo: "",
    id: "",
  });

  const handleEditClick = (post) => {
    setEditId(post.id);
    setIsModalEnabled(true);
    setEditFormData({
      autor: post.autor,
      titulo: post.titulo,
      conteudo: post.conteudo,
      id: post.id,
    });
  };

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Certeza que quer deletar esse post?"
    );
    if (confirmed) {
      await api.delete(`/posts/delete/${id}`).then((res) => {
        console.log(res.data);
        getPosts();
      });
    }
  };

  async function getPosts() {
    await api.get("/posts/").then((res) => {
      console.log(res.data.data);
      setPosts(res.data.data);
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="main-view">
        {isModalEnabled && (
          <NewPost
            isModalEnabled={setIsModalEnabled}
            post={editFormData}
            type={"edit"}
            refreshPosts={getPosts}
          />
        )}
        <div className="table__content">
          <h2>Painel Administrativo | Professores</h2>
          <p>Posts:</p>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Titulo</th>
                <th>Conteudo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <>
                    <td>{post.autor}</td>
                    <td>{post.titulo}</td>
                    <td
                      className={
                        post.status === "Ativo"
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {post.conteudo}
                    </td>
                  </>
                  <td>
                    <>
                      <button
                        className="btn edit"
                        onClick={() => handleEditClick(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => handleDeleteClick(post.id)}
                      >
                        Delete
                      </button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Admin;
