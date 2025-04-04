import { formatDistanceToNow } from "date-fns";
import "./index.css";

const CommentItem = (props) => {
  const { commentDetails } = props;
  const { id, name, comment, date, isLiked, initialClassName } = commentDetails;
  const initial = name ? name[0].toUpperCase() : "";
  const likedImage = isLiked
    ? "https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png"
    : "https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png";
  const likedButton = isLiked ? "button active" : "button";

  const postedTime = formatDistanceToNow(date);

  const onClickLiked = () => {
    const { toggleIsLiked } = props;
    toggleIsLiked(id);
  };

  const deleteComment = () => {
    const { onDeleteComment } = props;
    onDeleteComment(id);
  };

  return (
    <li className="container">
      <div classNmae="comment-continer">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div className="username-time-container">
          <p className="username">{name}</p>
          <p className="time">{postedTime}</p>
        </div>
        <p className="comment">{comment}</p>
        <div className="buttons-conatiner">
          <div className="like-container">
            <img src={likedImage} alt="like-btn" className="button-img" />
            <button
              className={likedButton}
              onClick={onClickLiked}
              type="button"
            >
              Like
            </button>
          </div>

          <button className="button" type="button" onClick={deleteComment}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              className="delete"
              alt="delete"
            />
          </button>
        </div>
      </div>
      <hr className="comment-line" />
    </li>
  );
};

export default CommentItem;
