"use client";
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [count, setCount] = useState(0);

  const data = {
    title: title,
    description: description,
    link: link,
  };
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Project created successfully");
      } else {
        alert("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center">Admin Dashboard </h1>
      <p className="text-5xl ">Count : {count}</p>
      <button
        onClick={() => {
          setCount(count + 5);
        }}
        className=" border border-amber-700 p-2 rounded m-2 "
      >
        Increase
      </button>
      <button
        onClick={() => {
          setCount(count - 5);
        }}
        className=" border border-amber-700 p-2 rounded m-2 "
      >
        Decrease
      </button>
      <p className="text-center mt-4">
        Welcome to the admin project page. Here you can manage your application.
      </p>
      <form className="max-w-md mx-auto mt-8">
        <div>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Enter project description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="link">
            Link
            <input
              type="text"
              id="link"
              name="link"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Enter project link"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </label>
        </div>
        <button
          onClick={handleSubmit}
          className=" border border-amber-700 p-2 rounded w-full mt-2 "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
