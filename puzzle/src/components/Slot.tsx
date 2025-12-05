import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface SlotProps {
  id: string;
  children?: React.ReactNode;
}

export const Slot = ({ id, children }: SlotProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        relative
        w-full h-full
        overflow-hidden
        rounded-sm
        transition-colors duration-200
        ${isOver ? 'brightness-125 ring-2 ring-yellow-400 z-10' : ''}
      `}
    >
      {children}
    </div>
  );
};