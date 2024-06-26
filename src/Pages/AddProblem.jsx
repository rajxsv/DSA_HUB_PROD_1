import axios from "axios";
import React from "react";
import { useState } from "react";
import { GreenAlert } from "../componenets/GreenAlert";
import { useNavigate } from "react-router-dom";

export default function AddProblem() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [tag, setTag] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  function handleTags(e) {
    e.preventDefault;
    if (tag) {
      setTags([...tags, tag]);
      setTag("");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios
        .post(
          "https://ap-south-1.aws.neurelo.com/rest/problems/__one",
          {
            title,
            description: desc,
            tags,
            links: link,
            done: false,
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

          setTimeout(() => {
            setShowAlert(false);
            setTitle("");
            setDesc("");
            setLink("");
            setTags("");
            navigate("/content/list");
          }, 1 * 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <form className="w-4/5 flex flex-col mt-9" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-bold mb-5 text-4xl leading-7 font-bold">
              Add Problem
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Keep the Problem description detailed and tags relevant.
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
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    disabled={showAlert}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required={true}
                    type="text"
                    placeholder="description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Describe the Problem
                </p>
              </div>
            </div>

            <label
              htmlFor="tag"
              className="block mt-6 text-sm font-medium leading-6 text-gray-900"
            >
              Tags
            </label>
            <div className="mt-2 flex flex-col gap-3 ">
              <div className="flex gap-2">
                {Array.isArray(tags) && tags.map((item, index) => <p className="p-2 bg-gray-100 mb-2" key={index}>{item}</p>)}
              </div>
              <div className="flex gap-4">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    disabled={showAlert}
                    className="block ml-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    type="text"
                    placeholder="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
                <button
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm "
                  onClick={handleTags}
                  type="button"
                >
                  Add
                </button>
              </div>
            </div>

            <label
              htmlFor="link"
              className="mt-6 block text-sm font-medium leading-6 text-gray-900"
            >
              Link to Problem
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  disabled={showAlert}
                  className="block ml-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  required={true}
                  type="url"
                  placeholder="Links"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
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
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm "
            >
              Add Problem
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
