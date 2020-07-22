import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function App() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
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
    const [isOpen, setIsOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                console.log(authUser);
                setUser(authUser);
            } else {
                //user has logged out
                setUser(null);
            }
        });

        return () => {
            unsubscribed();
        };
    }, [username, user]);

    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({ post: doc.data(), id: doc.id }))
            );
        });
    }, []);

    const signUp = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="app">
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                                alt=""
                            />
                        </center>
                        <Input
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button type="submit" onClick={signUp}>
                            Sign-up
                        </Button>
                    </form>
                </div>
            </Modal>
            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                    alt=""
                />
            </div>

            {user ? (
                <Button onClick={() => auth.signOut()}>Log out</Button>
            ) : (
                <div className="app__loginContainer">
                    <Button onClick={() => setIsOpen(true)}>Sign-in</Button>
                    <Button onClick={() => setIsOpen(true)}>Sign-up</Button>
                </div>
            )}
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
