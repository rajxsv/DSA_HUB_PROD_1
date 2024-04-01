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
import { Link } from "react-router-dom";

export default function UserPostCard({ key, data }) {
  const { id, user, title, body } = data;

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
              <Link to={`/post?id=${id}`} >
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
              </Link>
            </a>
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
          </div>
          <div>{user.username}</div>
          <div></div>
        </div>
        <div className="max-h-20 overflow-hidden">{body}</div>
      </div>
    )
  );
}
