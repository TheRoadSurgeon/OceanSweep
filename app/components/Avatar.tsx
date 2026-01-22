// components/Avatar.tsx
import React from "react";
import Image from "next/image";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUrl, size = 40 }) => {
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    return nameParts.length > 1
      ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`
      : nameParts[0].charAt(0);
  };

  const initials = getInitials(name);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div
          className="flex items-center justify-center w-full h-full bg-gray-500 text-white rounded-full"
          style={{ fontSize: size / 2 }}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;