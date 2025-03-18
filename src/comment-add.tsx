import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { addComment } from "./api.tsx";

const CommentAdd = () => {
    const history = useHistory();
    const [commentText, setCommentText] = useState('');
    const [commentImage, setCommentImage] = useState('');

    const handleSave = () => {
        addComment(commentText,commentImage).then(() => {
            history.push("/");
            window.location.reload();
        });
    };

    return (
        <div>
            <h2>Add Comment</h2>
            <label>Text</label><br/>
            <textarea 
                id="comment-text"
                name="comment-text"
                onChange={(e) => setCommentText(e.target.value)}
                maxLength={500} 
                rows={5} 
                style={{ width: "50%", resize: "both" }} 
            ></textarea><br />
            <label>Image</label><br/>
            <input 
                type="text" 
                name="comment-image" 
                style={{ width: "50%"}} 
                onChange={(e) => setCommentImage(e.target.value)}
            /><br/>
            <br/>    
            <button onClick={handleSave}>Save</button>
            </div>

    );
};

export default CommentAdd;