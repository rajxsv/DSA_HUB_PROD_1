import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { GreenAlert } from "../componenets/GreenAlert";

export default function EditProblem() {
  const { state } = useLocation();

  const [title, setTitle] = useState(state.title);
  const [desc, setDesc] = useState(state.description);
  const [link, setLink] = useState(
    state.links.slice(1, state.links.length - 1)
  );
  const [done, setDone] = useState(state.done);
  const [tag, setTag] = useState();
  const [edited, setEdited] = useState(false);
  const id = state.id;
  const navigate = useNavigate();

  const makeTags = (tags) => {
    let tagsWithoutQuotes = "";
    const n = tags.length;
    for (let i = 0; i < n; i++) {
      tagsWithoutQuotes += tags[i] == '"' ? "" : tags[i];
    }
    return tagsWithoutQuotes.split(" ");
  };

  const [tags, setTags] = useState(makeTags(state.tags));

  const handleTags = (e) => {
    if (tag) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .delete(`https://ap-south-1.aws.neurelo.com/rest/problems/${id}`, {
        headers: {
          "X-API-KEY":
            "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
        },
      })
      .then(() => {
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
            setEdited(true);
            setTimeout(() => {
              setEdited(false);
              navigate("/content/list");
            }, 2 * 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    // const url = `https://ap-south-1.aws.neurelo.com/rest/problems/${id}`;
    await axios
      .patch(
        url,
        {
          headers: {
            "X-API-KEY":
              "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
          },
        },
        problem
      )
      .then(() => {
        setEdited(true);
        setTimeout(() => {
          setEdited(false);
          navigate("/content/list");
        }, 2 * 1000);
      })
      .catch((err) => {
        console.log(err);
        alert("There was some problem sending request");
      });
  };

  return (
    <div className="w-full flex justify-center">
      <form className="w-4/5 flex flex-col mt-9" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-bold mb-5 text-4xl leading-7 font-bold">
              Edit Problem
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
            <div className="mt-2">
              <div className="flex gap-1">
                {tags &&
                  tags.map((item, index) => (
                    <p className="bg-gray-100 p-2 mb-2" key={index}>
                      {item}
                    </p>
                  ))}
              </div>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  className="block ml-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  type="text"
                  value={tag}
                  placeholder="tags"
                  onChange={(e) => setTag(e.target.value)}
                />
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
                  className="block ml-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  required={true}
                  type="url"
                  value={link}
                  placeholder="Links"
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
            <label
              htmlFor="link"
              className="mt-6 block text-sm font-medium leading-6 text-gray-900"
            >
              Attempted
            </label>
            <div className="mt-2">
              <div className="">
                <input
                  className="h-4 w-4 form-radio border-gray-300 text-black"
                  type="checkbox"
                  placeholder="done"
                  value={done}
                  onChange={(e) => setDone(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
        {edited ? (
          <GreenAlert message={"Problem Edited"} />
        ) : (
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm "
            >
              Edit Problem
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
