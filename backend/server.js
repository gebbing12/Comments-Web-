const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "../copy_of_comments.json";

// Get all comments
app.get("/comments", (req, res) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });
        res.json(JSON.parse(data).comments);
    });
});

// Add a new comments
app.post("/comments", (req, res) => {
    const { text, image } = req.body;
    const author = 'Admin';
    const likes = 0;
    if (!text || !image) {
        return res.status(400).json({ error: "Not a valid comment" });
    }

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
            res.json(newComment);
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
            res.json(comments[index]);
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