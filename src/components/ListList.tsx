import React from 'react';
import { Button } from "@/components/ui/button";
import { List } from '@/app/api/clickup/list/route';

interface ListListProps {
  lists: List[];
  onListSelect: (listId: string) => void;
}

export function ListList({ lists, onListSelect }: ListListProps) {
  return (
    <div className="flex flex-col w-full max-w-sm font-semibold space-y-2">
      {lists.map((list) => (
        <Button
          key={list.id}
          onClick={() => onListSelect(list.id)}
          variant="outline"
          className="justify-start h-auto py-2 px-4 text-left"
        >
          <span className="truncate">{list.name}</span>
        </Button>
      ))}
    </div>
  );
}