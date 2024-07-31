// Breadcrumb.tsx
import React from "react";
import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Space } from "@/app/api/clickup/space/route";
import { List } from "@/app/api/clickup/list/route";

interface BreadcrumbProps {
  space?: Space | null;
  list?: List | null;
  onSpaceClick: () => void;
  onListClick: () => void;
}

export function Breadcrumb({
  space,
  list,
  onSpaceClick,
  onListClick,
}: BreadcrumbProps) {
  return (
    <BreadcrumbUI>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <button onClick={onSpaceClick}>Spaces</button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {space && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <button onClick={onListClick}>{space.name}</button>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {list && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{list.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </BreadcrumbUI>
  );
}
