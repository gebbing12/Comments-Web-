import React, { useState, useMemo, useEffect } from "react";
import CommentItem from "./comment-item.tsx";
import { useHistory } from "react-router-dom";
import { fetchComments } from "./api.tsx";

const CommentList = () => {
    const history = useHistory();
    const [commentRelationship, setCommentRelationship] = useState([]);


    useEffect(() => {
        fetchComments().then((response) => {
            setCommentRelationship(response.relationship||{});
        })
    }, []); 


    const CommentReply = ({ comment,level}) => {
        const id = comment.id;
    
        return (
            <div style={{ marginLeft: `${level * 20}px` }} >
                <CommentItem key={id} {...comment} />
                {commentRelationship[id] && (
                    <div>
                        {console.log(id,comment)}
                        {commentRelationship[id].map((children: Comment) => (
                            <CommentReply comment={children} level={level + 1} /> 
                        ))}
                    </div>
                )}
            </div>
        );
    };


    return (
        <div>
            {commentRelationship['root'] && commentRelationship['root'].map(comment => {
                return <CommentReply comment={comment} level = {0}/>}
            )}
            <button onClick={() => history.push(`/add`)}>Add</button>
        </div>
    );
};

export default CommentList;
