import axios from "axios";
import React, { useEffect, useState } from "react";
import UserPostCard from "../componenets/UserPostCard";
import { Link } from "react-router-dom";
import Loader from "../componenets/Loader";
import { useUser } from "../UserContext";

export default function Discuss() {
  const [posts, setPosts] = useState();
  const [deleted, setDeleted] = useState();
  const [likesAndDislikes, setLikesAndDislikes] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPosts, setTotalPosts] = useState();
  const { user } = useUser();

  useEffect(() => {
    fetchAllPosts_Neurelo();
  }, [deleted, likesAndDislikes, page, pageSize]);

  const fetchAllPosts_Neurelo = async () => {
    try {
      await totalPostsNeurela();
      const take = pageSize;
      const skip = (page - 1) * pageSize;
      const url = `https://ap-south-1.aws.neurelo.com/rest/posts?take=${take}&skip=${skip}`;
      await axios
        .get(url, {
          headers: {
            "X-API-KEY":
              "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
          },
        })
        .then((res) => setPosts(res.data.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  };

  const totalPostsNeurela = async () => {
    try {
      await axios
        .get("https://ap-south-1.aws.neurelo.com/rest/posts", {
          headers: {
            "X-API-KEY":
              "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
          },
        })
        .then((res) => {
          setTotalPosts(res.data.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(
        "https://ap-south-1.aws.neurelo.com/custom/like",
        { user: user._id, post: postId },
        {
          headers: {
            "X-API-KEY":
              "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
          },
        }
      );
      setLikesAndDislikes(!likesAndDislikes);
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const handleDislike = async (postId) => {
    try {
      await axios
        .post(
          "https://ap-south-1.aws.neurelo.com/custom/dislike",
          { user: user._id, post: postId },
          {
            headers: {
              "X-API-KEY":
                "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
            },
          }
        )
        .catch((err) => {
          console.log(err);
        });
      setLikesAndDislikes(!likesAndDislikes);
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return posts ? (
    <>
      <div className="w-full mt-6 flex items-center flex-col gap-5">
        <div className="flex justify-center gap-[56rem]">
          <div className="m-3 text-bold text-4xl leading-7 font-bold">
            Discuss
          </div>
          <Link to={"/discuss/addpost"}>
            <button className="bg-black text-white p-3 rounded-md flex">
              Add Post
            </button>
          </Link>
        </div>
        <div className="w-4/5 gap-12 flex justify-center flex-wrap">
          {posts.map((item, index) => {
            return (
              <UserPostCard
                handleLike={handleLike}
                handleDislike={handleDislike}
                data={item}
                key={index}
              />
            );
          })}
        </div>
        <div className="w-[70%]">
          <div className="flex justify-between">
            <div className="px-5 py-2">Page {page}</div>
            <div className="flex gap-10 justify-end">
              <button
                className="bg-black text-white px-5 py-2 rounded-md"
                disabled={page == 1}
                onClick={() => setPage(page - 1)}
              >
                {"<-"} Prev
              </button>
              <button
                disabled={page >= totalPosts / pageSize}
                onClick={() => setPage(page + 1)}
                className="bg-black text-white px-5 py-2 rounded-md"
              >
                Next {"->"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <p>
            {" "}
            Showing {posts.length} of {totalPosts} posts{" "}
          </p>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
}
