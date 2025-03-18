import React, { useEffect } from "react";
import { useHistory, useLocation} from "react-router-dom";
import { deleteComment } from "./api.tsx";


export const CommentItem = ({id,author,text,date,likes,image,onDelete}) => {
    const history = useHistory();

    const handleDelete = (id) => {
        deleteComment(id).then(() => {
            history.push("/");
            window.location.reload();
        });
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <strong>{author}</strong>
            <p>{text}</p>
            {image && (
                <img 
                    src={image} 
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }} 
                />
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <small>{new Date(date).toLocaleString()}</small>
                <small>likes:{likes}</small>
                <div>
                    <button onClick={() => history.push({ pathname: `/edit/${id}`,state: { pre_text: text, pre_image: image }})}>Edit</button>
                    <button onClick={() => handleDelete(id)} style={{ marginLeft: "10px", color: "red" }}>Remove</button>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;