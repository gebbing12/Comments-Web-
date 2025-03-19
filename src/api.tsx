import axios from "axios";

const API_URL = "http://localhost:9000/comments";

export const fetchComments = () => axios.get(API_URL).then(res => res.data);
export const deleteComment = (id: string) =>  axios.delete(`${API_URL}/${id}`).then(res => res.data);
export const addComment = ( text: string , image: string) => axios.post(API_URL, { text, image }).then(res => res.data);
export const updateComment = (id: string, text: string, image: string) => axios.put(`${API_URL}/${id}`, { text, image }).then(res => res.data);
export const updateCommentLike = (id: string, likes: number) => axios.put(`${API_URL}/likes/${id}`, { likes }).then(res => res.data);

 