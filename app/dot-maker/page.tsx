"use client";

import { Redo, Undo } from "lucide-react";
import { MouseEvent, useState } from "react";

type TPoint = {
  x: number;
  y: number;
};

function Page() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [undoStack, setUndoStack] = useState<TPoint[]>([]);
  const [_, setRedoStack] = useState<TPoint[]>([]);

  const handleMouseClick = (e: MouseEvent) => {
    setPoints((prev) => [...prev, { x: e.clientX, y: e.clientY }]);
  };

  const handleUndo = () => {
    if (!points) return;
    const toBeUndoPoint = points.pop();

    if (!toBeUndoPoint) return;
    setUndoStack((prev) => [...prev, toBeUndoPoint]);
  };

  const handleRedo = () => {
    if (!points || !undoStack) return;
    const toBeRedoPoint = undoStack.pop();

    if (!toBeRedoPoint) return;
    setRedoStack((prev) => [...prev, toBeRedoPoint]);
    setPoints((prev) => [...prev, toBeRedoPoint]);
  };

  return (
    <div className="w-screen h-screen">
      <button
        onClick={handleUndo}
        disabled={!points?.length}
        className="p-2 px-10 border border-black rounded-full cursor-pointer disabled:cursor-not-allowed"
      >
        <Undo />
      </button>
      <button
        onClick={handleRedo}
        disabled={!undoStack?.length}
        className="p-2 px-10 border border-black rounded-full cursor-pointer disabled:cursor-not-allowed"
      >
        <Redo />
      </button>
      <div className="w-full h-full relative" onClick={handleMouseClick}>
        {points.map((point, index) => {
          return (
            <div
              key={index}
              className="absolute h-4 w-4 rounded-full bg-red-500"
              style={{
                top: point.y - 40,
                left: point.x,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Page;
