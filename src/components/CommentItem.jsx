import { Chip, Paper, Typography } from "@mui/material";

const CommentItem = ({ comment, onClick, showReplies }) => {
    return <Paper elevation={3} style={{ margin: 10 }}>
        {comment.id && showReplies && <Chip label={`#${comment.id}`} onClick={onClick} />}
        <Typography variant="h6">{comment.username}</Typography>
        {comment.replyTo && showReplies && <Typography variant="body" color='blue'>@{comment.replyTo}</Typography>}
        <Typography variant="body1">{`${comment.content}`}</Typography>
        <Typography variant="caption" color="textSecondary">{comment.time}</Typography>
        {showReplies && comment.replies && (
            comment.replies.map((reply, idx) => (
                <CommentItem comment={reply} onClick={() => {}} showReplies={false} key={idx}/>
            ))
        )}
    </Paper>;
};

export default CommentItem;