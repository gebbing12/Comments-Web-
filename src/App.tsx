import React, { useEffect, useState } from "react";
import { fetchComments, deleteComment } from "./api.tsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CommentList from "./comment-list.tsx"
import CommentEdit  from "./comment-edit.tsx"
import CommentAdd  from "./comment-add.tsx"

interface Comment {
    id: string;
    author: string;
    text: string;
    date: string;
    likes: number;
    image: string | null;
}

const App = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments().then((response) => {
            setComments(response|| []);
        })
    }, []);

    return (
    <Router>
        <Switch>
            <Route exact path="/" component={() => <CommentList comments={comments} />} />
            <Route exact path="/edit/:id" render={() => <CommentEdit/>}/>
            <Route exact path="/add" component={CommentAdd} />
        </Switch>
    </Router>
    );
};

export default App;
