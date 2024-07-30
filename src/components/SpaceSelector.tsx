import { Space } from '@/lib/types';

interface Props {
  spaces: Space[];
  onSelect: (space: Space) => void;
}

export default function SpaceSelector({ spaces, onSelect }: Props) {
  return (
    <select
      className="w-full p-2 border rounded mb-4"
      onChange={(e) => onSelect(spaces[parseInt(e.target.value)])}
    >
      <option value="">Select a Space</option>
      {spaces.map((space, index) => (
        <option key={space.id} value={index}>
          {space.name}
        </option>
      ))}
    </select>
  );
}