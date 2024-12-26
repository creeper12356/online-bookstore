import { Box, Button, Chip, Divider, Input, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useOkHandler } from "../hooks/useOkHandler";
import { UserContext } from "../lib/Context";
import { createBookComment, createBookCommentReply, getBookComments } from "../service/book";
import CommentItem from "./CommentItem";



/**
 * 评论区组件
 * @returns {JSX.Element}
 * @constructor
 */
const CommentArea = ({ bookId }) => {
    const [comments, setComments] = useState([]);
    const [commentCnt, setCommentCnt] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);

    const user = useContext(UserContext);

    const [messageOk, OkSnackbar] = useOkHandler();



    useEffect(() => {
        getBookComments(bookId)
            .then(res => {
                setComments(res.comments);
                setCommentCnt(res.total);
            });
    }, []);
    return (
        <>
            <Divider className="book-detail-divider-text">书籍评论（{commentCnt}条）</Divider>
            <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
              <Input placeholder="输入评论" value={newComment} onChange={(e) => {
                setNewComment(e.target.value);
              }}/>
              <Button variant="contained" onClick={() => {
                if(replyTo == null) {
                    createBookComment(bookId, {content: newComment})
                        .then(res => {
                            messageOk(res.message);
                            setCommentCnt(commentCnt + 1);
                            setComments([...comments, {id: '', username: user.username, content: newComment, time: new Date().toLocaleString()}]);
                            setNewComment('');
                        });
                } else {
                    createBookCommentReply(bookId, replyTo, {content: newComment})
                        .then(res => {
                            messageOk(res.message);
                            setCommentCnt(commentCnt + 1);
                            let newCommentObj = {id: '', username: user.username, content: newComment, time: new Date().toLocaleString()};
                            let newComments = comments.map(comment => comment.id === replyTo ? {...comment, replies: [...comment.replies, newCommentObj]} : comment);
                            newComments = [...newComments, newCommentObj];
                            setComments(newComments);
                            setNewComment('');
                        })
                }
                
              }}>发送</Button>
            </div>
            {replyTo && (<Typography>回复#{replyTo}</Typography>)}

            <Box>
                {comments.map((comment, idx) => (
                    <CommentItem key={idx} comment={comment} onClick={() => {
                        if(comment.id === replyTo) {
                            messageOk('取消引用');
                            setReplyTo(null);
                        } else {
                            messageOk(`引用#${comment.id}`)
                            setReplyTo(comment.id);
                        }
                    }} showReplies={true}/>
                ))}
            </Box>
            <OkSnackbar />
        </>
    );
};
export default CommentArea;
