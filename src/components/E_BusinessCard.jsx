import React, { useEffect, useState, useMemo } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { minidenticon } from "minidenticons";
import { toPng } from "html-to-image";
import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaXTwitter,
  FaFacebookF,
  FaStackOverflow,
} from "react-icons/fa6";

export default function E_BusinessCard() {
  const [cards, setCards] = useState({});
  const token = window.localStorage.getItem("token");

  const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
    const svgURI = useMemo(
      () =>
        "data:image/svg+xml;utf8," +
        encodeURIComponent(minidenticon(username, saturation, lightness)),
      [username, saturation, lightness]
    );
    return <img src={svgURI} alt={username} {...props} />;
  };

  useEffect(() => {
    getBusinessCards();
  }, []);

  const getBusinessCards = async (data) => {
    Loading.dots();
    try {
      const response = await fetch(`${BASE_URL}/api/card/businessCards`, {
        headers: {
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      // console.log(responseData);

      if (response.ok) {
        setCards(responseData);
        Loading.remove();
      } else {
        // console.error("Failed to load business cards");
        Loading.remove();
      }
    } catch (error) {
      // console.error("Error loading business card:", error);
      Loading.remove();
    }
  };

  const deleteCard = async (cardId) => {
    Loading.standard();
    try {
      const response = await fetch(
        `${BASE_URL}/api/card/deleteCard/${cardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        Notify.failure("Failed to delete the card, please try again!");
        Loading.remove();
        throw new Error(responseData.message || "Internal Server error.");
      }
      // remove the deleted card from state
      setCards(cards.filter((card) => card.id !== cardId));
      Notify.success(`Deleted the Card successfully with ID: ${cardId}`);
      getBusinessCards();
      Loading.remove();
      // console.log(`Deleted the Card successfully with ID: ${cardId}`);
    } catch (err) {
      // console.error("Error deleting business card:", err);
    }
  };

  const downloadImageFn = async (cardId) => {
    const cardElement = document.querySelector(`#BusinessCardFull-${cardId}`);
    if (cardElement === null) {
      return;
    }

    toPng(cardElement, { cacheBust: true, cors: true, pixelRatio: 5 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `businessCard-${Math.ceil(Math.random() * 100000)}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 className=" text-2xl text-white md:text-4xl font-semibold font-sans text-center border-4 py-3 px-5 my-5 mx-auto w-fit">
        Your Business Cards
      </h1>
      {cards.length <= 0 ? (
        <>
          <h1 className=" text-xl text-zinc-500 md:text-2xl font-normal text-center my-10 mx-auto w-fit">
            No business cards created yet!
          </h1>
        </>
      ) : (
        <div className="flex flex-wrap w-[95%] mx-auto">
          {Object.values(cards).map((card) => (
            <div
              key={card._id}
              className="w-full md:w-1/2 lg:w-1/3 px-4 items-center"
            >
              <div
                className="p-2 w-full md:px-2 mb-2 bg-slate-200 text-zinc-800 transition duration-500 ease
              hover:-translate-y-2 rounded-2xl bg-gradient-to-r from-rose-100 to-teal-100"
                id={`BusinessCardFull-${card._id}`}
                // style={{
                //   backgroundImage:
                //     "linear-gradient(to right bottom, #3a1c71, #642274, #862c75, #a33c75, #bc4f75, #cb5d75, #d86c75, #e47c76, #ec8876, #f49577, #faa278, #ffaf7b)",
                // }}
              >
                <span className="flex justify-center rounded-full">
                  <MinidenticonImg
                    saturation="60"
                    username={card.about}
                    crossOrigin="anonymous"
                    style={{
                      borderRadius: "50%",
                      height: "100px",
                      width: "100px",
                      backgroundColor: "none",
                    }}
                  />
                </span>
                <h4
                  className="mb-2 text-2xl text-center font-bold leading-8 text
                color-gray-100"
                >
                  {card.name}
                </h4>
                <h4
                  className="mb-2 mx-5 text-xl text-center font-semibold text
                color-gray-100"
                >
                  {card.about}
                </h4>
                {card.interests ? (
                  <h5
                    className="
                  mb-2 mx-2 text-lg text-center font-medium text
                  color-gray-100 tracking-normal"
                  >
                    Interested in: <br />
                    {card.interests}
                  </h5>
                ) : null}
                {card.phone ? (
                  <h5
                    className="
              mb-4 text-lg text-center font-medium leading-6
              text-color-gray-700"
                  >
                    Contact : {card.phone}
                  </h5>
                ) : null}

                <h3
                  className="
              flex items-center justify-center py-4 text-2xl font-semibold"
                >
                  Let's connect!
                </h3>
                <ul
                  className="
                flex flex-wrap justify-center w-full md:w-[80%] mx-auto gap-4 pb-2 text-l font-medium leading-5 text-white"
                >
                  {card.linkedin ? (
                    <li className="flex items-center px-2 py-1 rounded-xl bg-blue-900">
                      <FaLinkedinIn size="20" className="mr-1" />
                      <a href={`https://www.linkedin.com/in/${card.linkedin}`}>
                        {card.linkedin}
                      </a>
                    </li>
                  ) : null}
                  {card.github ? (
                    <li className="flex items-center px-2 py-1 rounded-xl bg-slate-800">
                      <FaGithub size="20" className="mr-1" />
                      <a href={`https://www.github.com/${card.github}`}>
                        {card.github}
                      </a>
                    </li>
                  ) : null}
                  {card.twitter ? (
                    <li className="flex items-center px-2 py-1 rounded-xl bg-black">
                      <FaXTwitter size="20" className="mr-1" />
                      <a href={`https://www.x.com/${card.twitter}`}>
                        {card.twitter}
                      </a>
                    </li>
                  ) : null}
                  {card.facebook ? (
                    <li className="flex items-center px-2 py-1 rounded-xl bg-blue-600">
                      <FaFacebookF size="20" className="mr-1" />
                      <a href={`https://www.facebook.com/${card.facebook}`}>
                        {card.facebook}
                      </a>
                    </li>
                  ) : null}
                  {card.instagram ? (
                    <li
                      className="flex items-center px-2 py-1 rounded-xl"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right bottom, #405de6, #854fd5, #ac40bf, #c731a6, #d7298d, #e12b7d, #e8336e, #ec3f5f, #f24c55, #f55a4b, #f76941, #f77737)",
                      }}
                    >
                      <FaInstagram size="20" className="mr-1" />
                      <a href={`https://www.instagram.com/${card.instagram}`}>
                        {card.instagram}
                      </a>
                    </li>
                  ) : null}
                  {card.stackOverflow ? (
                    <li className="flex items-center px-2 py-1 rounded-xl bg-amber-500">
                      <FaStackOverflow size="20" className="mr-1" />
                      <a
                        href={`https://www.stackoverflow.com/users/${card.stackOverflow}`}
                        className="leading-6"
                      >
                        {card.stackOverflow}
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className="flex justify-center">
                <button
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300
              font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-10
              dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => {
                    deleteCard(card._id);
                  }}
                >
                  Delete Card
                </button>
                <button
                  className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300
              font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-10
              dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => {
                    downloadImageFn(card._id);
                  }}
                >
                  Download as Image
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
