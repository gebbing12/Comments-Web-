import React, { useState, useEffect }  from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { fetchComments, updateComment } from "./api.tsx";

const CommentEdit = () => {
    const history = useHistory();
    const { id } = useParams();
    const location = useLocation();
    const { pre_text, pre_image } = location.state || {}; 
    const [commentText, setCommentText] = useState(pre_text);
    const [commentImage, setCommentImage] = useState(pre_image);

    const handleSave = () => {
        updateComment(id, commentText, commentImage).then(() => {
            history.push("/");
            window.location.reload();
        });
    };

    return (
        <div>
            <h2>Edit Comment {id}</h2>
            <label>Text</label><br/>
            <textarea 
                id="comment-text"
                name="comment-text"
                value={commentText}
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
                value={commentImage}
                onChange={(e) => setCommentImage(e.target.value)}
            /><br/>
            <br />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default CommentEdit;

