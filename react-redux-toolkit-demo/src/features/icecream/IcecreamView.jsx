import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./icecreamSlice";

const IcecreamView = () => {
  const [value, setValue] = useState(1);
  const numOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of icecreams - {numOfIcecreams}</h2>
      <button onClick={() => dispatch(ordered())}>Order ice cream</button>
      <input type="number"  value={value} onChange={(event) => setValue(parseInt(event.target.value))}/>
      <button onClick={() => dispatch(restocked(value))}>Restock ice creams</button>
    </div>
  );
};

export default IcecreamView;
