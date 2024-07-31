import { Space } from "@/app/api/clickup/space/route";
import React from "react";

interface SpaceListProps {
  spaces: Space[];
  onSpaceSelect: (spaceId: string) => void;
}

export function SpaceList({ spaces, onSpaceSelect }: SpaceListProps) {
  return (
    <div className="flex flex-col w-32 font-semibold">
      {spaces.map((space) => (
        <button
          key={space.id}
          onClick={() => onSpaceSelect(space.id)}
          className="p-2 m-2 shadow-2xl rounded-lg"
          style={{ backgroundColor: space.color }}
        >
          <h2>{space.name}</h2>
        </button>
      ))}
    </div>
  );
}
