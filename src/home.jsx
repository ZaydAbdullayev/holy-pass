import React, { useState } from "react";
import "./home.css";
import bg_left from "./assets/bg1.png";
import bg_right from "./assets/bg2.png";
import { HeavenButton, InfernalButton } from "./components/button";
import { RiTwitterXFill } from "react-icons/ri";
import {
  saveCardAsImage,
} from "./context/fetch.service";

const heavenQuotes = [
  "Departed quietly to speak with the angels.",
  "Successfully completed their mission on Earth.",
  "This card is a passport to eternal peace.",
];

const hellQuotes = [
  "Committed three of the seven deadly sins in a single sitting.",
  "There's no escape from the fire—but you've got style.",
  "This card is one-way to Hell. No refunds.",
];

export const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [side, setSide] = useState(null);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [generated, setGenerated] = useState(null);

  const openModal = (chosenSide) => {
    setSide(chosenSide);
    setModalOpen(true);
  };

  const generateCard = () => {
    const quote =
      side === "heaven"
        ? heavenQuotes[Math.floor(Math.random() * heavenQuotes.length)]
        : hellQuotes[Math.floor(Math.random() * hellQuotes.length)];

    setGenerated({ name, reason, side, quote });
    setModalOpen(false);
  };

  const reset = () => {
    setGenerated(null);
    setName("");
    setReason("");
    setSide(null);
  };

  const downloadCard = async () => {
    const cardElement = document.querySelector(".card");
    saveCardAsImage(cardElement);
  };

  return (
    <div className={`home-wrapper ${side}`}>
      <img src={bg_left} alt="Background Left" className={`left`} />
      <img src={bg_right} alt="Background Right" className={`right`} />
      {generated ? (
        <div className="result">
          <div className={`card ${generated.side}`}>
            <h3>{generated.name}</h3>
            <p>{generated.reason}</p>
            <p className="quote">“{generated.quote}”</p>
          </div>
          <div className="btns">
            {side === "hell" ? (
              <>
                <InfernalButton onClick={reset}>home</InfernalButton>
                <InfernalButton onClick={downloadCard}>Download</InfernalButton>
              </>
            ) : (
              <>
                <HeavenButton onClick={reset}>Home</HeavenButton>
                <HeavenButton onClick={downloadCard}>Download</HeavenButton>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="home-content">
            <h1 className="home-title">Holy Passport</h1>
            <p className="home-description">Choose your eternal destination</p>
            <p className="home-description">
              Get your passport to Heaven or Hell. Choose wisely!
            </p>
            <p className="home-description">
              May the odds be ever in your favor.
            </p>
            <a
              href="https://x.com/holy_passport"
              className="follow-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTwitterXFill /> Follow Us
            </a>
          </div>

          <div className="button-row">
            <HeavenButton onClick={() => openModal("heaven")}>
              Get Passport to Heaven
            </HeavenButton>
            <InfernalButton onClick={() => openModal("hell")}>
              Get Passport to Hell
            </InfernalButton>
          </div>

          {modalOpen && (
            <div className="modal-overlay">
              <div className={`modal-content ${side}`}>
                <h2>
                  {side === "heaven" ? "Heavenly Entry" : "Infernal Entry"}
                </h2>
                <input
                  type="text"
                  placeholder="Who is this for?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  rows="4"
                  cols="50"
                  placeholder="Why does this person deserve it?"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <button onClick={generateCard} className="generate">
                  Generate Passport
                </button>
                <span
                  onClick={() => {
                    setModalOpen(false);
                    reset();
                  }}
                  className="close"
                >
                  ×
                </span>
              </div>
            </div>
          )}
        </>
      )}

      <div className={`home-footer`}>
        <p className="home-footer-text">
          © 2025 Holy Passport. All rights reserved.
        </p>
        <p className="home-footer-text">Follow us into the light or flames</p>
      </div>
    </div>
  );
};
