import React from 'react';

const Ticket = ({ eventName, date, time, location, category, orderId, orderedBy }) => {
  return (
    <div className="flex font-roboto m-4 border border-gray-300 relative">
      {/* Left Section */}
      <div className="relative border-r border-dashed border-gray-300 p-6">
        {/* Circular Cutouts */}
        <div className="absolute w-8 h-8 bg-white border border-gray-300 border-t-transparent border-l-transparent rotate-45 -left-4 top-0 rounded-full"></div>
        <div className="absolute w-8 h-8 bg-white border border-gray-300 border-t-transparent border-l-transparent border-b-transparent rotate-45 -left-4 bottom-0 rounded-full"></div>
        <img
          src="https://i.ibb.co/W3cK42J/image-1.png"
          alt="Event Thumbnail"
          className="h-64 w-full object-cover"
        />
      </div>

      {/* Center Section */}
      <div className="p-6 flex-1">
        {/* Event Name */}
        <div className="pb-12">
          <span className="uppercase text-[#4872b0] text-sm font-medium">
            Your ticket for
          </span>
          <strong className="block text-lg font-normal uppercase">
            {eventName}
          </strong>
        </div>

        {/* Date and Location */}
        <div className="flex pb-12">
          <div className="flex-1 pr-4">
            <span className="uppercase text-sm font-semibold text-gray-500 block">
              Date and time
            </span>
            <span className="text-[#4872b0] font-medium text-base block">
              {date}
            </span>
            <span className="text-sm font-medium block">
              {time}
            </span>
          </div>
          <div className="flex-1">
            <span className="uppercase text-sm font-semibold text-gray-500 block">
              Location
            </span>
            <span className="text-[#4872b0] font-medium text-base block">
              {location.name}
            </span>
            <span className="text-sm font-medium block">
              {location.address}
            </span>
          </div>
        </div>

        {/* Ticket Type and Order Info */}
        <div className="flex">
          <div className="flex-1 pr-4">
            <span className="uppercase text-sm font-semibold text-gray-500 block">
              Ticket type
            </span>
            <span className="text-sm font-medium block">{category}</span>
          </div>
          <div className="flex-1">
            <span className="uppercase text-sm font-semibold text-gray-500 block">
              Order info
            </span>
            <span className="text-sm font-medium block">
              Order #{orderId}. Ordered By {orderedBy}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="p-6 bg-[#4872b0] flex flex-col relative text-white">
        {/* Circular Cutouts */}
        <div className="absolute w-8 h-8 bg-white border border-gray-300 border-t-transparent border-r-transparent border-b-transparent rotate-45 -right-4 top-0 rounded-full"></div>
        <div className="absolute w-8 h-8 bg-white border border-gray-300 border-r-transparent border-l-transparent border-b-transparent rotate-45 -right-4 bottom-0 rounded-full"></div>

        <div className="flex-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Qrcode_wikipedia_fr_v2clean.png"
            alt="QR Code"
            className="w-32 mx-auto p-1 bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Ticket;