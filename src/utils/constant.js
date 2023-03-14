export const BUTTON_LIST = [
  "All",
  "Live",
  "Mixes",
  "Ambient Music",
  "Chill-out music",
  "Tourism",
  "Piano",
  "Computer Programming",
  "Mantras",
];

const API_AUTH_KEY = "AIzaSyB9d7F062iB7vIyuxheHEbxCZbfGo4Pezg";

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  API_AUTH_KEY;

export const YOUTUBE_SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=chrome&ds=yt&q=";

export const COMMENTS_DATA = [
  {
    name: "Shreya Varma",
    text: "Lorem Ipsum dolar est se la vida",
    replies: [
      {
        name: "Shreya Varma",
        text: "Lorem Ipsum dolar est se la vida",
        replies: [],
      },
      {
        name: "Shreya Varma",
        text: "Lorem Ipsum dolar est se la vida",
        replies: [],
      },
    ],
  },
  {
    name: "Shreya Varma",
    text: "Lorem Ipsum dolar est se la vida",
    replies: [],
  },
  {
    name: "Shreya Varma",
    text: "Lorem Ipsum dolar est se la vida",
    replies: [
      {
        name: "Shreya Varma",
        text: "Lorem Ipsum dolar est se la vida",
        replies: [
          {
            name: "Shreya Varma",
            text: "Lorem Ipsum dolar est se la vida",
            replies: [],
          },
          {
            name: "Shreya Varma",
            text: "Lorem Ipsum dolar est se la vida",
            replies: [
              {
                name: "Shreya Varma",
                text: "Lorem Ipsum dolar est se la vida",
                replies: [
                  {
                    name: "Shreya Varma",
                    text: "Lorem Ipsum dolar est se la vida",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Shreya Varma",
    text: "Lorem Ipsum dolar est se la vida",
    replies: [],
  },
  {
    name: "Shreya Varma",
    text: "Lorem Ipsum dolar est se la vida",
    replies: [],
  },
];
