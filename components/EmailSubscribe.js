import { useState } from "react";
import axios from "axios";

const EmailSubscribe = ({ projects }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);
    try {
      const response = await axios.post("/api/newsletter", { email });
      setState("SUCCESS");
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setState("ERROR");
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-8 border-gray-500 border-solid border rounded-sm mt-8">
      <h2 className="text-3xl font-bold text-center">
        I also have a newsletter!
      </h2>

      <div className="flex w-1/2 lg:w-2/3 justify-center mt-5 flex-col lg:flex-row">
        <input
          className="appearance-none mb-2 lg:mb-0 w-full lg:w-2/3 border border-gray-500 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-600"
          type="email"
          pattern="^[^ ]+@[^ ]+\.[a-z]{2,6}$"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={`lg:ml-2 w-full lg:w-1/3 shadow bg-brand2 focus:shadow-outline focus:outline-none text-center text-white font-bold py-2 px-4 rounded flex ${
            state === "LOADING" ? "button-gradient-loading" : ""
          }`}
          type="button"
          disabled={state === "LOADING"}
          onClick={subscribe}
        >
          Subscribe
        </button>
      </div>
      {state === "ERROR" && (
        <p className="w-1/2 mt-2 text-red-600">{errorMessage}</p>
      )}
      {state === "SUCCESS" && (
        <p className="w-1/2 mt-2 text-green-600">Success!</p>
      )}
    </div>
  );
};

export default EmailSubscribe;

// import { useRef } from "react";

// export default function EmailSubscribe() {
//   const inputRef = useRef(null);

//   const subscribeUser = async (e) => {
//     e.preventDefault();

//     // this is where your mailchimp request is made

//     const res = await fetch("/api/subscribeUser", {
//       body: JSON.stringify({
//         email: inputRef.current.value,
//       }),

//       headers: {
//         "Content-Type": "application/json",
//       },

//       method: "POST",
//     });
//   };

//   return (
//     <form onSubmit={subscribeUser}>
//       <label htmlFor="email-input" className="form__label">
//         Your Best Email
//       </label>

//       <input
//         type="email"
//         id="email-input"
//         name="email"
//         placeholder="your best email"
//         ref={inputRef}
//         required
//         autoCapitalize="off"
//         autoCorrect="off"
//       />

//       <button type="submit" value="" name="subscribe">
//         Subscribe
//       </button>
//     </form>
//   );
// }
