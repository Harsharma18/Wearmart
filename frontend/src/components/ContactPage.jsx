import React from "react";

function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-10 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">
          Contact WearMart
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-lg p-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-700">Get in Touch</h3>
            <p className="text-gray-600">
              Have questions about products or your order? Feel free to reach out — we’re here to help!
            </p>
            <div>
              <p className="font-semibold">Email:</p>
              <p>support@wearmart.com</p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p>Fashion Hunt,Gurugram</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full resize-none  border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-10">
          <iframe
            className="w-full h-64 rounded-lg shadow-md"
            src="https://maps.google.com/maps?q=gurugram
            %20fashion%20street&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen=""
            loading="lazy"
            title="WearMart Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
