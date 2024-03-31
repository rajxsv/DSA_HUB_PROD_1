import React from "react";
import Header from "./Header";
import Info from "../componenets/Info";
import { useLocation, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../componenets/Loader";
import Compiler from "./Compiler";

export default function Problems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const problemId = searchParams.get("problemid");
  const [problem, setProblem] = useState({});

  useEffect(() => {
    const fetchProblem = async () => {
      console.log(problemId);
      const url = `https://ap-south-1.aws.neurelo.com/rest/problems/${problemId}`;
      let response;
      try {
        response = await axios.get(url, {
          headers: {
            "X-API-KEY":
              "neurelo_9wKFBp874Z5xFw6ZCfvhXfqsIq3xJ9PprY34l/iG73FoDsm1a2toCQDCyYKxmX/dsN7wfPE0jdstsxWXvbh9xs8js4Qni9UYDGcQW0R8srkVnZ/nxtGC8ZWIYt84ahXJwzmaE6hVzEZW6Udhqf7rSPnxuLPr6es8eW6vpL3SmhtRKYVULlVYEKkfJQSUTz+8_Hcv2on0WPHJ12Q3KWGRTOBOKgv4NA5tBfA+I/XqQCX8=",
          },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      setProblem(response.data.data);
    };
    fetchProblem();
  }, []);

  console.log(problem);

  return problem ? (
    <div className="flex w-full h-full">
      <div className="w-2/5">
        <Info problem={problem} />
      </div>
      <div className="border-solid m-4 border w-3/5 ">
        <Compiler />
      </div>
    </div>
  ) : (
    <Loader />
  );
}
