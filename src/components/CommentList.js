import Comment from "./Comment";

const CommentList = ({ commentsData }) => {
  return commentsData.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="pl-5 border-l-4 ml-6">
        <CommentList commentsData={comment.replies} />
      </div>
    </div>
  ));
};

export default CommentList;
