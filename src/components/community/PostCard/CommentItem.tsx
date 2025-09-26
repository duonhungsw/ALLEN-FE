import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send } from "lucide-react";
import { ReactionPicker } from "./Reaction";
import CommentList from "./CommentList";
import { Comment, User } from "@/types/postType";
import { useTranslations } from "next-intl";
import { ReactionModal } from "./ReactionModal";
import { ReactionsSummary } from "./ReactionsSummary";

interface CommentItemProps {
  comment: Comment;
  user: User;
  postId: string;
  onReply: (content: string, parentId: string) => void;
  onReaction: (type: string, commentId: string) => void;
  replies?: Comment[];
  fetchReplies?: (commentId: string) => void;
  isLoadingReplies?: boolean;
  errorReplies?: any;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  user,
  postId,
  onReply,
  onReaction,
  replies = [],
  fetchReplies,
  isLoadingReplies,
  errorReplies,
}) => {
  const tPostCard = useTranslations("PostCard");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [showReactionModal, setShowReactionModal] = useState(false)

  const handleReply = () => {
    if (!replyContent.trim()) return;
    onReply(replyContent, comment.id);
    setReplyContent("");
    setShowReplyInput(false);
  };

  const handleShowReplies = () => {
    setShowReplies((prev) => !prev);
    if (fetchReplies && !showReplies) fetchReplies(comment.id);
  };

  return (
    <div>
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={comment.userAvatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-[#93D333] text-black font-semibold">
            {comment.userName?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="bg-[#0f1619] rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <h5 className="font-semibold text-sm text-white truncate">{comment.userName}</h5>
              <span className="text-xs text-gray-400">•</span>
              {/* <span className="text-xs text-gray-400">{comment.createdAt}</span> */}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-2 ml-2">
            <ReactionPicker
              postId={comment.id}
              userId={user.id}
              onReactionSelect={(type) => onReaction(type, comment.id)}
            />
            {comment.replyCount !== 0 ? 
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-gray-400"
              onClick={handleShowReplies}
            >
              Show comment
            </Button> : ""}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-gray-400"
              onClick={() => setShowReplyInput((prev) => !prev)}
            >
              {showReplyInput ? "Hủy" : "Trả lời"}
            </Button>
            <ReactionsSummary
                objectId={comment.id}
                onShowModal={() => setShowReactionModal(true)}
              />
            <ReactionModal objectId={comment.id} open={showReactionModal} onOpenChange={()=>setShowReactionModal(false)}/>
          </div>
          {/* Replies Section */}
          {showReplies && (
            <div className="ml-11 mt-3">
              {isLoadingReplies && (
                <div className="flex items-center justify-center py-4">
                  <div className="text-sm text-gray-400">Đang tải trả lời...</div>
                </div>
              )}
              {errorReplies && (
                <div className="text-red-500 text-sm py-2">Lỗi: {errorReplies.message}</div>
              )}
              {replies && Array.isArray(replies) && replies.length > 0 ? (
                <CommentList
                  comments={replies}
                  user={user}
                  postId={postId}
                  onReply={onReply}
                  onReaction={onReaction}
                />
              ) : !isLoadingReplies ? (
                <div className="text-sm text-gray-400 py-2">Chưa có trả lời nào.</div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      {showReplyInput && (
          <div className="ml-11 mt-3">
            <div className="bg-[#0f1619] rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Avatar className="h-6 w-6 flex-shrink-0">
                  <AvatarImage src={user?.picture} />
                  <AvatarFallback className="bg-[#93D333] text-black text-xs font-semibold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder={tPostCard("replyPlaceholder") || "Viết trả lời..."}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleReply();
                        }
                      }}
                      className="flex-1 h-8 text-sm bg-[#1a2a2f] border-[#93D333] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#93D333] focus:border-transparent"
                      maxLength={300}
                    />
                    <Button
                      onClick={handleReply}
                      disabled={!replyContent.trim()}
                      size="sm"
                      className="bg-[#93D333] hover:bg-[#7bb32a] text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400"
                      onClick={() => setShowReplyInput(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  {replyContent.length > 0 && (
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{replyContent.length}/300 ký tự</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyContent("")}
                        className="h-5 px-2 text-xs text-gray-400"
                      >
                        Xóa
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default CommentItem;
