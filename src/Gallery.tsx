import { ReactElement, useCallback, useEffect, useRef, useState } from "react";

import { Card, CardProps } from "./Card";
import style from "./Gallery.module.css";
import data from "./data.json";
import { useAPICall } from "./useAPICall";
import { Spinner } from "./Spinner";
import Overlay from "./Overlay";

const getInitialData = () => {
  const cardData = localStorage.getItem("cardData");

  if (cardData) {
    try {
      return JSON.parse(cardData);
    } catch (e) {
      console.error("Error parsing cardData from localStorage:", e);
      localStorage.removeItem("cardData");
      return data;
    }
  }
  return data;
};

export const Gallery = (): ReactElement => {
  const [cardData, setCardData] = useState(getInitialData());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<string>("");
  const [overlayImg, setOverlayImg] = useState("");
  const { isLoading, callAPI } = useAPICall<{ [key: string]: string }>(
    "/api/data"
  );

  const moveListItem = useCallback(
    (dragIndex: number, dropIndex: number) => {
      const cards = [...cardData];
      [cards[dragIndex], cards[dropIndex]] = [
        cards[dropIndex],
        cards[dragIndex],
      ];
      setCardData(cards);
      localStorage.setItem("cardData", JSON.stringify(cards));

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const lastSaved = localStorage.getItem("last-saved");
        if (lastSaved) {
          setTimeElapsed(getTimeElapsed(lastSaved));
        }
        callAPI({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cards),
        });
      }, 5000);
    },
    [cardData]
  );

  function getTimeElapsed(lastSaved: string) {
    const prevTime = JSON.parse(lastSaved);
    const now = new Date().getTime(); // Current time in milliseconds
    const elapsed = now - prevTime; // Previous time in milliseconds
    const seconds = Math.floor(elapsed / 1000); // Convert to seconds
    const minutes = Math.floor(seconds / 60); // Convert to minutes
    const hours = Math.floor(minutes / 60); // Convert to hours
    const days = Math.floor(hours / 24); // Convert to days

    localStorage.setItem("last-saved", JSON.stringify(now));

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  }

  return (
    <div className={style.container}>
      {!isLoading &&
        cardData?.map((cardDetails: CardProps, index: number) => (
          <div className={style.card} key={cardDetails.type}>
            <Card
              {...cardDetails}
              index={index}
              moveListItem={moveListItem}
              setOverlayImg={setOverlayImg}
            />
          </div>
        ))}
      {isLoading && (
        <div>
          {timeElapsed && `Last saved ${timeElapsed}.`}
          <Spinner></Spinner>
        </div>
      )}
      <Overlay isVisible={!!overlayImg} onClose={() => setOverlayImg('')}>
        <figure>
          <img src={overlayImg} width={250} height={250} />
        </figure>
      </Overlay>
    </div>
  );
};
