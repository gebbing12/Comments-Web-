import React, { useState, useMemo, useEffect } from "react";
import CommentItem from "./comment-item.tsx";
import { useHistory } from "react-router-dom";
import { fetchComments } from "./api.tsx";

const CommentList = () => {
    const history = useHistory();
    const [comments, setComments] = useState([]);
    const commentsPerPage = 10;
    
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Number(queryParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

    const totalPages = Math.ceil(comments.length / commentsPerPage);

    useEffect(() => {
        fetchComments().then((response) => {
            setComments(response|| []);
        })
    }, []); 

    useEffect(() => {
        history.push(`/?page=${currentPage}`);
    }, [currentPage]);


    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const currentComments = useMemo(() => {
        if (comments.length === 0) return [];
        return comments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);;
    }, [comments, currentPage]);

    return (
        <div>
            {currentComments.map(comment => (
                <CommentItem key={comment.id} {...comment} />
            ))}
            {currentPage === totalPages && (
                <button onClick={() => history.push(`/add`)}>Add</button>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                <span style={{ margin: "0 10px" }}> {currentPage} </span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default CommentList;
