import React from "react";

const StudentPage = (props) => {
  const { currentSong } = props;
  return (
    <div
      style={{
        marginTop: "10%",
      }}
    >
      {currentSong ? currentSong.name : "No song selected"}
    </div>
  );
};

export default StudentPage;
