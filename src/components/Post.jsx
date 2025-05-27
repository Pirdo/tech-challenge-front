import { Link } from "react-router-dom";

import classes from "./Post.module.css";

function Post({ id, title, author, body }) {
  return (
    <li className={classes.post}>
      <Link to={id}>
        <p className={classes.author}>{author}</p>
        <p className={classes.author}>{title}</p>
        <p className={classes.text}>
          {body.length > 25 ? body.substring(0, 10) + "..." : body}
        </p>
      </Link>
    </li>
  );
}

export default Post;
