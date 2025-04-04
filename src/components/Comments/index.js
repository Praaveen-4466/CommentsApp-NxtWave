import React, { Component } from "react";

import "./index.css";

import CommentItem from "../CommentItem";

import { v4 } from "uuid";

const initialContainerBackgroundClassNames = [
  "amber",
  "blue",
  "orange",
  "emerald",
  "teal",
  "red",
  "light-blue",
];

class Comments extends Component {
  state = {
    nameInput: "",
    commentInput: "",
    commentsList: [],
  };

  onDeleteComment = (commentId) => {
    const { commentsList } = this.state;
    this.setState({
      commentsList: commentsList.filter((comment) => comment.id !== commentId),
    });
  };

  toggleIsLiked = (id) => {
    this.setState((prevState) => ({
      commentsList: prevState.commentsList.map((eachComment) =>
        id === eachComment.id
          ? { ...eachComment, isLiked: !eachComment.isLiked }
          : eachComment
      ),
    }));
  };

  renderCommentsList = () => {
    const { commentsList } = this.state;

    return commentsList.map((eachComment) => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        onDeleteComment={this.onDeleteComment}
      />
    ));
  };

  onAddComment = (event) => {
    event.preventDefault();
    const { nameInput, commentInput } = this.state;

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: `initial-container ${
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length
          )
        ]
      }`,
    };

    this.setState((prevState) => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: "",
      commentInput: "",
    }));
  };

  onChangeCommentInput = (event) => {
    this.setState({
      commentInput: event.target.value,
    });
  };

  onChangeNameInput = (event) => {
    this.setState({
      nameInput: event.target.value,
    });
  };

  render() {
    const { nameInput, commentInput, commentsList } = this.state;

    return (
      <div className="main-container">
        <div className="sub-container">
          <h1 className="heading">Comments</h1>
          <div className="comments-input">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="paragraph">Say something about 4.0 technologies</p>
              <input
                className="input-folder"
                placeholder="Your Name"
                type="text"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                className="text-area"
                placeholder="Your Comment"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />
              <button className="button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    );
  }
}

export default Comments;
