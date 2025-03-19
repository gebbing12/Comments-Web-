import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
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

    return (
    <Router>
        <Switch>
            <Route exact path="/" component={() => <CommentList/>} />
            <Route exact path="/edit/:id" render={() => {
                const username = localStorage.getItem("username");
                return username === "Admin" ? <CommentEdit /> : <Redirect to="/" />}}
            />
            <Route exact path="/add" component={CommentAdd} />
        </Switch>
    </Router>
    );
};

export default App;
