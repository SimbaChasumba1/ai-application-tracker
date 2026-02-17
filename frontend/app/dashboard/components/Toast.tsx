"use client";



import { useEffect } from "react";



interface ToastProps {

  message: string;

  isVisible: boolean;

  onClose: () => void;

}



export default function Toast({ message, isVisible, onClose }: ToastProps) {

  useEffect(() => {

    if (!isVisible) return;



    const timer = setTimeout(() => {

      onClose();

    }, 3000);



    return () => clearTimeout(timer);

  }, [isVisible, onClose]);



  if (!isVisible) return null;



  return (

    <div className="fixed bottom-6 right-6 z-50">

      <div className="bg-black text-white px-5 py-3 rounded-lg shadow-lg animate-fade-in">

        {message}

      </div>

    </div>

  );

}