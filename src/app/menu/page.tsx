"use client"
import MenuImages from './components/MenuImages';
import { useState } from 'react';
import '../../styles/style.css';
import menuList from '../menuList.json';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <h2 className="text-2xl text-center m-2">Explore Our Menu</h2>
      <div className="flex justify-center m-4">
        <select style={{ width: "120px"}} className="p-2" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="All">All</option>
        {menuList.map(category => (
          <option key={category.id} value={category.category}>{category.category}</option>
        ))}
      </select>
      </div>
        <MenuImages 
          allMenu={menuList.flatMap(category => category.items)} 
          filteredMenu={menuList.find(category => category.category === selectedCategory)?.items || []} 
          selectedCategory={selectedCategory} 
        />
    </>
  );
};

export default MenuPage;
