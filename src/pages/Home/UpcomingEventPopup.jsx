import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "luminaQuestPopupHiddenUntil";

const UpcomingEventPopup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hiddenUntil = Number(localStorage.getItem(STORAGE_KEY));

    if (hiddenUntil && Date.now() < hiddenUntil) {
      return;
    }

    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const hideForOneDay = () => {
    const oneDayLater = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, oneDayLater.toString());
    setShow(false);
  };

  const goToEvent = () => {
    hideForOneDay();
    navigate("/events");
  };

  if (!show) return null;

  return (
    <>
      <div
        className="
          fixed
          bottom-4
          right-4
          left-4
          sm:left-auto
          sm:w-[280px]
          z-50
          border-[3px]
          border-emerald-400
          bg-[#1a3025]
          shadow-[5px_5px_0_#000]
          font-['Press_Start_2P']
          animate-[popup_.3s_ease-out]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-emerald-500 px-3 py-2 border-b-[3px] border-emerald-700">
          <div className="flex items-center gap-2">
            <span className="animate-pulse text-sm">📜</span>

            <span className="text-[8px] sm:text-[9px] tracking-wider text-black">
              QUEST AVAILABLE
            </span>
          </div>

          <button
            onClick={hideForOneDay}
            className="text-black hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-3">

          <div className="flex items-center gap-2">
            <span className="text-base">💎</span>

            <h2 className="text-[11px] text-white leading-5">
              Lumina
              <br />
              Radiance Rally
            </h2>
          </div>

          <div className="mt-4 space-y-2 text-[8px] text-gray-300">

            <div className="flex items-center gap-2">
              📅 <span>July 20, 2026</span>
            </div>

          </div>

          {/* Progress */}
          <div className="mt-4">

            <div className="h-1.5 bg-gray-800 border border-black">
              <div className="h-full w-full bg-emerald-400 animate-pulse"></div>
            </div>

            <p className="mt-2 text-center text-[8px] text-emerald-300">
              REGISTRATION OPEN
            </p>

          </div>

          {/* Button */}
          <button
            onClick={goToEvent}
            className="
              mt-4
              w-full
              bg-emerald-500
              border-2
              border-emerald-700
              py-2.5
              text-[10px]
              text-black
              hover:bg-emerald-400
              active:translate-y-[1px]
              transition-all
            "
          >
            ▶ VIEW QUEST
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes popup{
            from{
              opacity:0;
              transform:translateY(20px) scale(.95);
            }
            to{
              opacity:1;
              transform:translateY(0) scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export default UpcomingEventPopup;