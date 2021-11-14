import React, { useEffect, useState } from "react";

const Test = () => {
  const [first, setFirst] = useState(null);
  useEffect(() => {
    console.log("i m inside of [] useeffect");
  }, []);

  useEffect(() => {
    console.log("i m inside of first variable useEffect");
  }, [first]);

  return <div>This is test div</div>;
};

export default Test;
