import React, { useEffect, useState } from "react";
import songData from "../data/songs.json";

interface ImagePreloaderProps {
  onLoad: () => void;
}

export function ImagePreloader({ onLoad }: ImagePreloaderProps) {
  const [loadedImages, setLoadedImages] = useState(0);
  const totalImages = songData.songs.length;

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = songData.songs.map((song) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages((prev) => prev + 1);
            resolve(null);
          };
          img.onerror = () => {
            setLoadedImages((prev) => prev + 1);
            resolve(null);
          };
          img.src = song.image;
        });
      });

      await Promise.all(imagePromises);
      onLoad();
    };

    preloadImages();
  }, [onLoad]);

  const progress = Math.round((loadedImages / totalImages) * 100);

  if (progress < 100) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="mb-4 h-2 w-48 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-white/70">Loading images... {progress}%</p>
        </div>
      </div>
    );
  }

  return null;
}
