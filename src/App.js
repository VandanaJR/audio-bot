import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import JoinPage from "./components/join-page";
import TeacherPage from "./components/teacher-page";
import StudentPage from "./components/student-page";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001", {
  transports: ["websocket"],
});

function App() {
  //const audio = new Audio();
  const audioRef = useRef();
  const [join, setjoin] = useState(false);
  const [role, setrole] = useState("");
  const [cId, setcId] = useState("");
  const [name, setname] = useState("");
  const [playing, setplaying] = useState(false);
  const [currentSong, setcurrentSong] = useState(null);

  useEffect(() => {
    socket.on("song-select", (msg) => {
      console.log(msg);
      setcurrentSong(msg);
      audioRef.current.src = msg.URL;
      console.log(audioRef.current.src);
    });
  }, []);

  useEffect(() => {
    if (role === "Student")
      socket.on("new-joinee-song", (msg) => {
        setcurrentSong(msg.audio);
        audioRef.current.src = msg.audio.URL;
        audioRef.current.currentTime = msg.currentTime;
        console.log(msg);
        if (msg.playing && audioRef.current.paused) {
          audioRef.current.play();
        }
      });
  }, [role]);

  useEffect(() => {
    socket.on("play", (msg) => {
      setplaying(true);
      if (audioRef.current && !isNaN(msg)) audioRef.current.currentTime = msg;
      audioRef.current.play();
    });

    socket.on("pause", (msg) => {
      setplaying(false);
      if (audioRef.current && !isNaN(msg)) audioRef.current.currentTime = msg;
      audioRef.current.pause();
    });
    socket.on("reset", () => {
      audioRef.current.currentTime = 0;
    });
  }, [currentSong]);

  useEffect(() => {
    console.log(name);
    socket.emit("join server", name);
    if (join)
      socket.emit("join room", cId, (roomName) => {
        console.log(`joined room ${roomName}`);
      });
  }, [join]);

  useEffect(() => {
    socket.on("new-joinee", (id) => {
      console.log(role);
      if (role === "Teacher" && currentSong)
        //if (playing) console.log(audioRef.current.currentTime);
        socket.emit("new-joinee-song", {
          id,
          audio: currentSong,
          currentTime: audioRef.current.currentTime,
          playing,
        });
    });
  }, [role, currentSong, playing]);

  const selectSong = (song) => {
    console.log("song selected");
    console.log(song);
    setcurrentSong(song);
    socket.emit("song-select", { cId, song });
  };

  const play = () => {
    console.log("play clicked");
    let time = audioRef.current.currentTime;
    socket.emit("play", { cId, time });
  };

  const pause = () => {
    console.log("pause clicked");
    let time = audioRef.current.currentTime;
    socket.emit("pause", { cId, time });
  };
  const reset = () => {
    console.log("reset clicked");
    socket.emit("reset", { cId });
  };

  return (
    <div className="App">
      <audio ref={audioRef}></audio>
      {join ? (
        role === "Teacher" ? (
          <TeacherPage
            play={play}
            pause={pause}
            reset={reset}
            setcurrentSong={setcurrentSong}
            currentSong={currentSong}
            selectSong={selectSong}
            role={role}
          ></TeacherPage>
        ) : (
          <StudentPage currentSong={currentSong}></StudentPage>
        )
      ) : (
        <JoinPage
          setjoin={setjoin}
          setrole={setrole}
          setcId={setcId}
          setname={setname}
          setplaying={setplaying}
        ></JoinPage>
      )}
    </div>
  );
}

export default App;
