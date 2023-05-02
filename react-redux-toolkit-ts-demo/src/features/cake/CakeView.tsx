import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ordered, restocked } from "./cakeSlice";

const CakeView = () => {
  const numOfCakes = useAppSelector((state) => state.cake.numOfCakes);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>Number of cakes - {numOfCakes} </h2>
      <button onClick={() => dispatch(ordered())}>Order cake</button>
      <button onClick={() => dispatch(restocked(10))}>Restock cakes</button>
    </div>
  );
};

export default CakeView;