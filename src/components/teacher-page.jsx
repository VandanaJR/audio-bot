import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001", {
  transports: ["websocket"],
});

const TeacherPage = (props) => {
  const { play, pause, reset, currentSong, setcurrentSong, selectSong, role } =
    props;
  const playlist = [
    {
      name: "Happier",
      URL: "https://storage.googleapis.com/test-edtech/Marshmello%20ft.%20Bastille%20-%20Happier%20(Official%20Music%20Video).mp3",
    },
    {
      name: "Nattadavu",
      URL: "https://storage.googleapis.com/test-edtech/03%20Adavus%20-%202.mp3",
    },
  ];

  // useEffect(() => {
  //   socket.on("new-joinee", (id) => {
  //     console.log(id);
  //     if (role === "Teacher") {
  //       console.log("hi");
  //       //io.to(roomName).emit('new-joinee');
  //     }
  //   });
  // }, []);
  return (
    <div
      style={{
        marginTop: "10%",
      }}
    >
      <div
        style={{
          margin: "10px",
        }}
      >
        {currentSong ? currentSong.name : "No song selected"}
      </div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
      {playlist.map((song, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <p
              style={{
                margin: "10px",
              }}
            >
              {song.name}
            </p>
            <button
              onClick={() => {
                setcurrentSong(song);
                selectSong(song);
              }}
            >
              select
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TeacherPage;
