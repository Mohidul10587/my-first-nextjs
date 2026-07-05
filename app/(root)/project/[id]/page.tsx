"use client";

import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id;

  // Dummy Data
  const projectArray = [
    {
      id: "1",
      title: "E-Commerce Website",
      description: "An online shopping platform built with Next.js",
      price: "$500",
      image: "/projects/ecommerce.jpg",
      category: "Web Application",
      client: "ABC Store",
      status: "Completed",
      duration: "3 Months",
      technologies: ["Next.js", "React", "Tailwind CSS", "Node.js", "MongoDB"],
      features: [
        "Product Management",
        "Shopping Cart",
        "Payment Gateway",
        "Order Tracking",
        "Admin Dashboard",
      ],
      github: "https://github.com/example/ecommerce",
      liveDemo: "https://ecommerce-demo.com",
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      title: "Portfolio Website",
      description: "Personal portfolio for a developer",
      price: "$200",
      image: "/projects/portfolio.jpg",
      category: "Portfolio",
      client: "John Doe",
      status: "Completed",
      duration: "2 Weeks",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      features: [
        "Responsive Design",
        "Project Showcase",
        "Contact Form",
        "SEO Optimization",
      ],
      github: "https://github.com/example/portfolio",
      liveDemo: "https://portfolio-demo.com",
      createdAt: "2025-02-20",
    },
    {
      id: "3",
      title: "Food Delivery App",
      description: "A food ordering and delivery application",
      price: "$800",
      image: "/projects/food-delivery.jpg",
      category: "Mobile & Web App",
      client: "Food Express",
      status: "In Progress",
      duration: "4 Months",
      technologies: [
        "Next.js",
        "React Native",
        "Express.js",
        "MongoDB",
        "Socket.io",
      ],
      features: [
        "Real-Time Order Tracking",
        "Online Payments",
        "Restaurant Dashboard",
        "Push Notifications",
        "Ratings & Reviews",
      ],
      github: "https://github.com/example/food-delivery",
      liveDemo: "https://food-demo.com",
      createdAt: "2025-03-10",
    },
  ];
  // Filter project by id
  const singleProject = projectArray.find((project) => project.id === id);

  return (
    <div className="text-center text-3xl">
      <Navbar />

      {singleProject ? (
        <div className="mt-10">
          <img
            src={singleProject.image}
            alt={singleProject.title}
            className="w-96 mx-auto rounded-lg"
          />

          <h1 className="text-4xl font-bold mt-4">{singleProject.title}</h1>

          <p className="text-xl mt-4">{singleProject.description}</p>

          <p className="text-green-600 text-2xl font-semibold">
            {singleProject.price}
          </p>

          <p>Category: {singleProject.category}</p>
          <p>Client: {singleProject.client}</p>
          <p>Status: {singleProject.status}</p>
          <p>Duration: {singleProject.duration}</p>

          <div className="mt-4">
            <h2 className="font-bold">Technologies:</h2>
            {singleProject.technologies.map((tech) => (
              <span key={tech} className="mr-2">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <h2 className="font-bold">Features:</h2>
            <ul>
              {singleProject.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-10 text-red-500">Project Not Found</div>
      )}
    </div>
  );
};

export default Page;
