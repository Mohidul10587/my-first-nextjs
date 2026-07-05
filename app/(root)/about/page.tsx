import React from "react";
import Address from "@/components/Address";

const page = () => {
  return (
    <div className="text-center text-3xl">
      THis is about page
      <Address
        address={{
          name: "Mr Xyz ",
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
        }}
      />
    </div>
  );
};

export default page;
