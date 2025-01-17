import { useState } from "react";
import "./CommentForm.css"

interface CommentFormProps {
    hackathonId: string;
    onAddComment: (id: string, comment: string) => void;
  }
  
  const CommentForm: React.FC<CommentFormProps> = ({ hackathonId, onAddComment }) => {
    const [comment, setComment] = useState('');
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (comment.trim() !== '') {
        onAddComment(hackathonId, comment.trim());
        setComment('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          required
        />
        <button className="hac-btn" type="submit">Add Comment</button>
      </form>
    );
  }
  
  export default CommentForm;
  