import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/appSlice";
import { COMMENTS_DATA } from "../utils/constant";
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

const WatchPage = () => {
  const dispatch = useDispatch();

  const [queryParams] = useSearchParams();

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div className="p-3 m-3 ">
      <iframe
        width="800"
        height="350"
        src={
          "https://www.youtube.com/embed/" +
          queryParams.get("v") +
          "?autoplay=1"
        }
        title="Learn DOM Manipulation In 18 Minutes"
        autoPlay={true}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="mt-8">
        <span className="font-bold mb-4 px-8">Comments:</span>
        <CommentList commentsData={COMMENTS_DATA} />
      </div>
    </div>
  );
};

export default WatchPage;
