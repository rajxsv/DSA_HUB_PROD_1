import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../UserContext";
import Loader from "../componenets/Loader";
import { GreenAlert } from "../componenets/GreenAlert";

export default function AddPost() {
  const [showAlert, setShowAlert] = useState(false);
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { user } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      axios
        .post(
          "https://ap-south-1.aws.neurelo.com/rest/posts/__one",
          {
            user: user._id,
            title,
            body,
          },
          {
            headers: {
              "X-API-KEY":
                "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
            },
          }
        )
        .then(() => {
          setShowAlert(true);
          timeoutFn();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error);
    }
    setLoad(false);
  };
  
  const timeoutFn = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2 * 1000);
  };

  return load ? (
    <Loader />
  ) : (
    <div className="w-full flex justify-center">
      <form className="w-4/5 flex flex-col mt-9" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-bold mb-5 text-4xl leading-7 font-bold">
              Add Post
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Type your mind !
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      disabled={showAlert}
                      className="block flex-1 ml-2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      required={true}
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Body
                </label>
                <div className="mt-2">
                  <textarea
                    disabled={showAlert}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required={true}
                    type="text"
                    placeholder="description"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Add more content
                </p>
              </div>
            </div>
          </div>
        </div>
        {showAlert ? (
          <GreenAlert message={"Problem Added"} />
        ) : (
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Post
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
