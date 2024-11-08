import React, { useState } from "react";

export default function BasicForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    fetch("https://formcarry.com/s/Q-FYHETGcuj", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          setSuccess("Viestisi on lähetetty onnistuneesti.");
          setName("");
          setEmail("");
          setMessage("");
          setError("");
        } else if (response.code === 422) {
          // Field validation failed
          setError(response.message);
          setSuccess("");
        } else {
          // other error from formcarry
          setError(response.message);
          setSuccess("");
        }
      })
      .catch((error) => {
        // request related error.
        setError(error.message ? error.message : error);
        setSuccess("");
      });
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Yhteydenottolomake
      </h1>
      <p className="text-gray-900 dark:text-white">
        Epäiletkö virhettä tai huomasitko kirjoitusvirheen? Vai haluatko ottaa
        yhteyttä muussa asiassa? Jätä meille viesti oheisella lomakkeella.
        Yritämme vastata mahdollisimman pian.
      </p>
      <hr className="border-t-2 border-gray-300 w-full max-w-[calc(100% - 2rem)] mx-auto mb-4 mt-2" />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
        <div className="formcarry-block">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Nimi
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder=""
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="formcarry-block">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Sähköpostiosoite
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder=""
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="formcarry-block">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Viestisi
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            placeholder=""
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>

        <div className="formcarry-block">
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Lähetä
          </button>
        </div>
      </form>
    </div>
  );
}
