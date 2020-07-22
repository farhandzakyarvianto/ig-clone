import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

const Post = () => {
    return (
        <div className="post">
            {/* Header --> avatar + username */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="Username"
                    src="/static/images/avatar1.jpg"
                />
                <h3>Username</h3>
            </div>

            {/* Image */}
            <img
                className="post__image"
                src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB170FWN.img?h=450&w=799&m=6&q=60&o=f&l=f&x=603&y=67"
                alt=""
            />

            {/* username + caption */}
            <h4 className="post__text">
                <strong>Username</strong> Day 52
            </h4>
        </div>
    );
};

export default Post;
