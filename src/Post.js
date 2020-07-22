import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

const Post = ({username, caption, imageUrl}) => {
    return (
        <div className="post">
            {/* Header --> avatar + username */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar1.jpg"
                />
                <h3>{username}</h3>
            </div>

            {/* Image */}
            <img
                className="post__image"
                src={imageUrl}
                alt=""
            />

            {/* username + caption */}
            <h4 className="post__text">
                <strong>{username}</strong> {caption}
            </h4>
        </div>
    );
};

export default Post;
