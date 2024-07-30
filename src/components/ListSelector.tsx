import { List } from '@/lib/types';

interface Props {
  lists: List[];
  onSelect: (list: List) => void;
}

export default function ListSelector({ lists, onSelect }: Props) {
  return (
    <select
      className="w-full p-2 border rounded mb-4"
      onChange={(e) => onSelect(lists[parseInt(e.target.value)])}
    >
      <option value="">Select a List</option>
      {lists.map((list, index) => (
        <option key={list.id} value={index}>
          {list.name}
        </option>
      ))}
    </select>
  );
}
