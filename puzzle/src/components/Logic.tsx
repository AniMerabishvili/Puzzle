import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface LogicProps {
  id: string;
  imgUrl: string;
  bgX: number;
  bgY: number;
  isSolved: boolean;
  isGameFinished: boolean;
}

export const Logic = ({ id, imgUrl, bgX, bgY, isSolved, isGameFinished }: LogicProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    disabled: isGameFinished,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    backgroundImage: `url(${imgUrl})`,
    backgroundPosition: `${bgX}% ${bgY}%`,
    backgroundSize: '300% 300%',
    width: '100%', 
    height: '100%',
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        rounded-sm 
        shadow-sm 
        transition-all duration-200
        ${isGameFinished ? 'cursor-default border-none filter brightness-110' : 'cursor-grab active:cursor-grabbing'}
        ${isSolved && !isGameFinished ? 'border-none z-0' : 'border border-white/50 hover:z-10'}
        ${isDragging ? 'shadow-2xl scale-110 ring-2 ring-white' : ''}
      `}
    />
  );
};