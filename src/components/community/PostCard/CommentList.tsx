import React from "react";
import CommentItem from "./CommentItem";
import { Comment, User } from "@/types/postType";
import { useFetchReplyComment } from "@/hooks/community/useCommunity";

interface CommentListProps {
  comments: Comment[];
  user: User;
  postId: string;
  onReply: (content: string, parentId: string) => void;
  onReaction: (type: string, commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  user,
  postId,
  onReply,
  onReaction,
}) => {
  const { data: commentsReply, mutate: getCommentReply, isPending: isLoadingReply, error: errorReply } = useFetchReplyComment()

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          user={user}
          postId={postId}
          onReply={onReply}
          onReaction={onReaction}
          replies={commentsReply?.data || []}
          fetchReplies={() => getCommentReply(comment.id)}
          isLoadingReplies={isLoadingReply}
          errorReplies={errorReply}
        />
      ))}
    </div>
  );
};

export default CommentList;
