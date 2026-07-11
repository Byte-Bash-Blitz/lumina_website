import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpcomingEventPopup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("hideQuestPopup")) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    localStorage.setItem("hideQuestPopup", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-[#10221b] border-2 border-emerald-400 rounded-lg shadow-2xl animate-bounce">
      <div className="p-4">
        <p className="text-emerald-300 text-xs tracking-widest">
          📜 NEW QUEST
        </p>

        <h3 className="text-white text-xl font-bold mt-2">
          Lumina Radiance Rally
        </h3>

        <p className="text-gray-300 text-sm mt-2">
          Registration is now open!
        </p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() =>
              navigate("/events")
            }
            className="flex-1 bg-emerald-400 text-black font-bold py-2 rounded hover:scale-105 transition"
          >
            View Event
          </button>

          <button
            onClick={closePopup}
            className="px-3 bg-gray-700 text-white rounded"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventPopup;