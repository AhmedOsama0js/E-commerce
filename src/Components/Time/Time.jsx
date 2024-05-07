import React, { useEffect, useState } from "react";

export default function TodayTime() {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toDateString().split(" "));

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      setClock(currentTime.toLocaleTimeString());
      setDate(currentTime.toDateString().split(" "));
    }, 1000);


    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div>
      <div>{`${date[0]}, ${date[2]}-${date[1]}-${date[3]}`}</div>
      <div>{clock}</div>
    </div>
  );
}
