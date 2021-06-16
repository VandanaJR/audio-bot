import React, { useState } from "react";

const JoinPage = (props) => {
  const { setjoin, setrole, setcId, setname } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          style={{
            margin: "10px",
          }}
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          style={{
            margin: "20px",
          }}
          placeholder="Confrence Id"
          onChange={(e) => setcId(e.target.value)}
        />
      </div>
      <div>
        <button
          style={{
            margin: "5px",
          }}
          onClick={() => setrole("Teacher")}
        >
          Teacher
        </button>
        <button
          style={{
            margin: "5px",
          }}
          onClick={() => setrole("Student")}
        >
          Student
        </button>
      </div>

      <button
        style={{
          margin: "5px",
        }}
        onClick={() => setjoin(true)}
      >
        Join
      </button>
    </div>
  );
};

export default JoinPage;
