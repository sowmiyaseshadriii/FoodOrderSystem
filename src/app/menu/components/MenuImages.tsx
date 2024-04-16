import React from 'react';
import Image from 'next/image';
import { GetMenuItems, GetMenuList } from '@/lib/dto';

interface props {
  allMenu: GetMenuItems[];
  filteredMenu: GetMenuItems[];
  selectedCategory: string;
}

const MenuImages = ({ allMenu, filteredMenu, selectedCategory }: props) => {
  const menuToDisplay = selectedCategory === "All" ? allMenu : filteredMenu;

  return (
    <div className="imageGalleryContainer">
      {menuToDisplay.map((item) => (
        <div key={item.value} className="imageItem">
          <Image 
            src={item.imageUrl}
            alt={item.name} 
            width={200} 
            height={200} 
            className='image'
          />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuImages;