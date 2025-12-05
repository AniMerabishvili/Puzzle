import React, { useState, useRef, useEffect } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Logic } from './Logic';
import { Slot } from './Slot';
import { pieces } from './data';

const img = './public/assets/Jeep.jpg';

export const Puzzle = () => {
  const [image, setImage] = useState<string>(img);
  const [preview, setPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPositions, setCurrentPositions] = useState<string[]>([]);

  useEffect(() => {
    shuffle();
  }, []);

  const shuffle = () => {
    const ids = pieces.map(p => p.id);
    const shuffled = [...ids].sort(() => Math.random() - 0.5);
    setCurrentPositions(shuffled);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
          shuffle();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overSlotId = over.id as string; 

    const oldIndex = currentPositions.indexOf(activeId);
    const newIndex = pieces.findIndex(p => p.id === overSlotId);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newPositions = [...currentPositions];
        const targetPiece = newPositions[newIndex];
        
        newPositions[newIndex] = activeId;
        newPositions[oldIndex] = targetPiece;
        
        setCurrentPositions(newPositions);
    }
  };

  const solvedCount = currentPositions.filter((pieceId, index) => {
      const slotId = pieces[index].id;
      return pieceId === slotId;
  }).length;

  const isGameFinished = solvedCount === 9;

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center py-12 px-4 font-sans">
      
      <h1 className="text-5xl font-black text-center leading-tight mb-8 tracking-tighter text-transparent bg-clip-text bg-blue-500">
        PUZZLE <br /> MASTER
      </h1>

      <div className="flex gap-4 mb-10">
        <button onClick={shuffle} className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-md font-bold border border-gray-600">
          Shuffle
        </button>
        <button 
          onMouseEnter={() => setPreview(true)}
          onMouseLeave={() => setPreview(false)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-bold shadow-lg shadow-blue-900/50"
        >
          Preview
        </button>
        <button onClick={() => fileInputRef.current?.click()} className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-md font-bold shadow-lg shadow-purple-900/50">
          Upload
        </button>
        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-none">
          <img src={image} alt="Preview" className="w-[300px] h-[300px] object-cover rounded-xl shadow-2xl border-4 border-white" />
        </div>
      )}

      <DndContext onDragEnd={handleDragEnd}>
        <div className="bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-700 relative">
            
            <div className="grid grid-cols-3 gap-1 w-[300px] h-[300px]">
              {pieces.map((slot, index) => {
                const pieceIdInThisSlot = currentPositions[index];
                const pieceData = pieces.find(p => p.id === pieceIdInThisSlot);
                const isCorrect = slot.id === pieceIdInThisSlot;

                return (
                  <Slot key={slot.id} id={slot.id}>
                    {pieceData && (
                        <Logic
                            id={pieceData.id}
                            imgUrl={image}
                            bgX={pieceData.x}
                            bgY={pieceData.y}
                            isSolved={isCorrect}
                            isGameFinished={isGameFinished}
                        />
                    )}
                  </Slot>
                );
              })}
            </div>

             {isGameFinished && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm z-50">
                  <div className="text-center animate-bounce">
                    <h2 className="text-4xl font-bold text-green-400 drop-shadow-lg">SOLVED!</h2>
                    <button onClick={shuffle} className="mt-4 px-4 py-2 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition">Play Again</button>
                  </div>
                </div>
              )}
        </div>
      </DndContext>
    </div>
  );
};