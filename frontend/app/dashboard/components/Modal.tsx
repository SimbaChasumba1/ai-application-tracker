"use client";



import { ReactNode } from "react";



export default function Modal({

  isOpen,

  onClose,

  children,

}: {

  isOpen: boolean;

  onClose: () => void;

  children: ReactNode;

}) {

  if (!isOpen) return null;



  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">

        <button

          className="absolute top-2 right-2 text-gray-500 hover:text-black"

          onClick={onClose}

        >

          ✕

        </button>

        {children}

      </div>

    </div>

  );

}