import React, { useEffect,useState } from "react";
import { useHistory, useLocation} from "react-router-dom";
import { deleteComment,updateCommentLike } from "./api.tsx";


export const CommentItem = ({id,author,text,date,likes,image}) => {
    const history = useHistory();
    const [liked,setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const username = localStorage.getItem("username");

    const handleDelete = (id) => {
        deleteComment(id).then(() => {
            window.location.reload();
        });
    };

    const handleLikeChange = () => {
        console.log('click')
        const newLikes = liked ? likeCount - 1 : likeCount + 1;
        setLiked(!liked);
        setLikeCount(newLikes);
        console.log("nnn",newLikes)
        updateCommentLike(id, newLikes)
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
                <div>
                    <button onClick={() => handleLikeChange()} >{liked ? "Dislike" : "Like"}</button>
                    <small> {likeCount}</small>
                </div>
                <div>
                    {username === "Admin" && (<button onClick={() => history.push({ pathname: `/edit/${id}`,state: { pre_text: text, pre_image: image }})}>Edit</button>)}
                    <button onClick={() => handleDelete(id)} style={{ marginLeft: "10px", color: "red" }}>Remove</button>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;