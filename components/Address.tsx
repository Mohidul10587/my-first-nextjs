import React from "react";

const Address = ({ address }: any) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Shipping Address</h2>
        </div>

        <div className="space-y-1 text-slate-600 text-sm">
          <p className="font-semibold text-slate-800 text-base">
            {address.name}
          </p>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} {address.zip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Address;
