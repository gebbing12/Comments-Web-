const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "../comments2.json";

// Get all comments and relationship
// commentRelationship{
//  'root':[{},{}] // first comments
//     1:[{},{}] // comment1's reply
// }
app.get("/comments", (req, res) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        let comments = JSON.parse(data).comments; 
        let commentRelationship = {};
        commentRelationship['root'] = []

        for (let i = 0; i < comments.length; i++) {
            let id = comments[i].id;
            if (!comments[i].parent) {
                commentRelationship['root'].push(comments[i]);
            } else {
                const parent = comments[i].parent;
                if (!commentRelationship[parent]) {
                    commentRelationship[parent] = [];
                }
                commentRelationship[parent].push(comments[i]);
            }
        }

        const response = {
            relationship: commentRelationship,
        };

        res.json(response);
    });
});

// Add a new comments
app.post("/comments", (req, res) => {
    const { text, image } = req.body;
    const author = 'Admin';
    const likes = 0;

    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        const comments = JSON.parse(data).comments;
        const newComment = {
            id: (comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1).toString(), // get new id
            author,
            text,
            date: new Date().toISOString(),
            likes,
            image
        };

        comments.push(newComment);

        const jsonData = { comments };
        fs.writeFile(FILE_PATH, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error writing file" });
            res.json({ success: true });
        });
    });
});

// Update comment
app.put("/comments/:id", (req, res) => {
    const _id = req.params.id;
    const { text, image } = req.body;

    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        let comments = JSON.parse(data).comments;
        const index = comments.findIndex(c => c.id == _id);

        if (index === -1) {
            return res.status(404).json({ error: "Comment not found" });
        }

        comments[index].text = text;
        comments[index].image = image;

        const jsonData = { comments };
        fs.writeFile(FILE_PATH, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error writing file" });
            res.json({ success: true });
        });
    });
});

// Update likes number
app.put("/comments/likes/:id", (req, res) => {
    const _id = req.params.id;
    const { likes } = req.body;

    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        let comments = JSON.parse(data).comments;
        const index = comments.findIndex(c => c.id == _id);

        if (index === -1) {
            return res.status(404).json({ error: "Comment not found" });
        }

        comments[index].likes = likes;

        const jsonData = { comments };
        fs.writeFile(FILE_PATH, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error writing file" });
            res.json({ success: true });
        });
    });
});

// delete a comment
app.delete("/comments/:id", (req, res) => {
    const _id = req.params.id;

    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        let comments = JSON.parse(data).comments;
        const filterComments = comments.filter(comment => comment.id != _id);

        const jsonData = { "comments": filterComments};
        fs.writeFile(FILE_PATH, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error writing file" });
            res.json({ success: true });
        });
    });
});

app.listen(9000, () => console.log("Server running on port 9000"));