import { useState } from "react";

interface CommentFormProps {
    hackathonId: number;
    onAddComment: (id: number, comment: string) => void;
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
        <button type="submit">Add Comment</button>
      </form>
    );
  }
  
  export default CommentForm;
  