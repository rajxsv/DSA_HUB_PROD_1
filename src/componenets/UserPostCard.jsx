import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useUser } from "../UserContext";
import axios from "axios";

export default function UserPostCard({
  handleLike,
  handleDislike,
  handleDelete,
  key,
  data,
}) {
  const { id, user, likes, dislikes, title, body } = data;
  const loggedInUser = useUser().user;
  const [likesofPost, setLikesOfPost] = useState(0);
  const [dislikesOfPost, setDislikesOfPost] = useState(0);
  const [flag, setFlag] = useState(false);

  const count = (mode) => {
    let count = 0;
    let array = likesofPost;
    if (mode == 0) {
      array = dislikesOfPost;
    }
    array.forEach((item) => (count += item.post == id));
    return count;
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const filter = JSON.stringify({ post: { equals: `${id}` } });
        await axios
          .get(
            "https://ap-south-1.aws.neurelo.com/rest/likes?filter=" + filter,
            {
              headers: {
                "X-API-KEY":
                  "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
              },
            }
          )
          .then((res) => {
            setLikesOfPost(res.data?.data || 0);
          })
          .catch((err) => console.log(err));
        await axios
          .get(
            "https://ap-south-1.aws.neurelo.com/rest/dislikes?filter=" + filter,
            {
              headers: {
                "X-API-KEY":
                  "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
              },
            }
          )
          .then((res) => {
            setDislikesOfPost(res.data?.data || 0);
          });
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [flag]);

  return (
    (
      <Card
        key={key}
        className="mt-6 overflow-hidden w-96 border-solid border-2"
      >
        <CardBody>
          <div className="flex justify-between">
            <p className="f text-3xl font-extrabold font p-2 bg-gray-100 rounded-md">
              {"</>"}
            </p>
          </div>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
          <Typography>{body}</Typography>
        </CardBody>
        <CardFooter className=" bg-gray-100 rounded-lg m-3 items-center ">
          <div className="flex justify-between ">
            <a href="#" className="inline-block">
              <Button
                size="sm"
                variant="text"
                className="flex items-center hover:text-black gap-2 bg-gray-800 text-white"
              >
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
            <button
              className="bg-green-100 text-green-900 text-[0.8rem] p-1 rounded-md px-2"
              onClick={() => () => {
                setFlag(!flag);
                handleLike(id, user._id);
              }}
            >
              Like
            </button>{" "}
            <p className="flex flex-col justify-center">
              {likesofPost && count(1)}
            </p>
            <button
              className="bg-red-100 text-red-900 p-1 px-2 rounded-md text-[0.8rem]"
              onClick={() => handleDislike(id, user._id)}
            >
              Dislike
            </button>{" "}
            <p className="flex flex-col justify-center">
              {dislikesOfPost && count(0)}
            </p>
          </div>
        </CardFooter>
      </Card>
    ) || (
      <div
        key={key}
        className="shadow-md border-solid border-2 m-2 p-3 rounded-lg max-h-[70px] min-h-[12rem] flex flex-col justify-evenly"
      >
        <div>
          <div className="font-extrabold text-2xl flex justify-between">
            <div>{title}</div>
            <div>
              {loggedInUser._id == user._id && (
                <button
                  onClick={() => handleDelete(_id)}
                  className="w-min text-sm rounded-lg text-red-300 p-2"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <div>{user.username}</div>
          <div></div>
        </div>
        <div className="max-h-20 overflow-hidden">{body}</div>
        <div className="flex gap-2">
          <button
            className="bg-green-100 text-green-900 text-[0.8rem] p-1 rounded-md px-2"
            onClick={() => handleLike(_id, user._id)}
          >
            Like
          </button>{" "}
          <p className="flex flex-col justify-center">{likes.length}</p>
          <button
            className="bg-red-100 text-red-900 p-1 px-2 rounded-md text-[0.8rem]"
            onClick={() => handleDislike(_id, user._id)}
          >
            Dislike
          </button>{" "}
          <p className="flex flex-col justify-center">{dislikes.length}</p>
        </div>
      </div>
    )
  );
}
