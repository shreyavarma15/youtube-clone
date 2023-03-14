import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/appSlice";
import { addMessage } from "../utils/chatSlice";
import { COMMENTS_DATA } from "../utils/constant";
import CommentList from "./CommentList";
import LiveChat from "./LiveChat";
import { generateName, generateMessage } from "../utils/helper";

const WatchPage = () => {
  const [queryParams] = useSearchParams();
  const chatMessages = useSelector((store) => store.chat.messages);
  const dispatch = useDispatch();
  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  useEffect(() => {
    //API POLLING
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateName(),
          message: generateMessage(10),
        })
      );
    }, 2000);

    return () => {
      clearInterval(i);
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addMessage({
        name: "Shreya Varma",
        message: liveMessage,
      })
    );

    setLiveMessage("");
  };

  return (
    <div>
      <div className="p-3 m-3 flex">
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

        <div className="flex flex-col">
          <div className="ml-3 border-black overflow-y-scroll h-[365px] flex flex-col-reverse">
            {chatMessages.map((message, i) => (
              <LiveChat key={i} name={message.name} message={message.message} />
            ))}
          </div>
          <hr />
          <form
            className="flex justify-between mt-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className="border border-black p-2 ml-3"
              placeholder="Type..."
              type="text"
              value={liveMessage}
              onChange={(e) => setLiveMessage(e.target.value)}
            />
            <button className="bg-green-300 p-2 rounded-md">Send</button>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <span className="font-bold mb-4 px-8">Comments:</span>
        <CommentList commentsData={COMMENTS_DATA} />
      </div>
    </div>
  );
};

export default WatchPage;
