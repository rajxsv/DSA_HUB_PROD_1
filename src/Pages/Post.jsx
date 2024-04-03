import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom"; // Remove useHistory
import axios from "axios";
import Loader from "../componenets/Loader";


export function Post() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchPost = async () => {
      const url = `https://ap-south-1.aws.neurelo.com/rest/posts/${id}`;
      try {
        const response = await axios.get(url, {
          headers: {
            "X-API-KEY":
              "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
          },
        });
        setPost(response.data.data);
      } catch (error) {
        console.log(error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const goBack = () => {
    window.history.back(); // Use window.history.back() to navigate back
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="m-20 text-bold w-4/5 text-4xl leading-7 font-bold mb-6">Post</div>
      {loading ? (
        <Loader />
      ) : post ? (
        <div className="m-20 bg-gray-100 w-4/5 rounded-md p-10">
          <div className="mb-8">
            <p className="text-lg font-semibold">Title</p>
            <Typography
              variant="h2"
              className="bg-gray-200 p-4 rounded-md text-center"
            >
              {post.title}
            </Typography>
          </div>
          <div>
            <p className="text-lg font-semibold">Description</p>
            <Typography
              variant="paragraph"
              className="bg-gray-200 p-4 rounded-md text-wrap break-words"
            >
              {post.body}
            </Typography>
          </div>
        </div>
      ) : (
        <div className="m-20">Post not found.</div>
      )}
      <Button
        color="black"
        buttonType="filled"
        size="regular"
        rounded={false}
        block={false}
        iconOnly={false}
        ripple="light"
        className="m-8"
        onClick={goBack}

      >
        Go Back
      </Button>
    </div>
  );
}
