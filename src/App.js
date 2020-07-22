import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";

function App() {
    const [posts, setPosts] = useState([
        // {
        //     username: "Farhan",
        //     caption: "Super",
        //     imageUrl:
        //         "https://image.freepik.com/free-vector/offline-twitch-banner-with-paper-cut-design-template_1361-2601.jpg",
        // },
        // {
        //     username: "Dzaky",
        //     caption: "Damn",
        //     imageUrl:
        //         "https://image.freepik.com/free-psd/male-polo-mockup_210398-30.jpg",
        // },
        // {
        //     username: "Arvianto",
        //     caption: "Wooooww",
        //     imageUrl:
        //         "https://image.freepik.com/free-psd/luxury-logo-mockup-black-business-card_103373-143.jpg",
        // },
    ]);

    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({ post: doc.data(), id: doc.id }))
            );
        });
    }, []);
    return (
        <div className="app">
            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                    alt=""
                />
            </div>
            {posts.map(({ post, id }) => (
                <Post
                    key={id}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                />
            ))}
        </div>
    );
}

export default App;
