import React, { useState, useMemo } from "react";
import CommentItem from "./comment-item.tsx";
import { useHistory } from "react-router-dom";

const CommentList = ({ comments }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 10;
    const totalPages = Math.ceil(comments.length / commentsPerPage);
    const history = useHistory();

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
