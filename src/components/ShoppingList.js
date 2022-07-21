import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Add useEffect hook
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) =>setItems(items));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  //upadtes the item
  function onAddToCart(cartItem){
    const updatedCart = items.map((item)=>{
      if(item.id===cartItem.id){
        return cartItem
      }
      return item
    })
    setItems(updatedCart)
  }
   // add this function!
   function handleAddItem(newItem) {
    // console.log("In ShoppingList:", newItem);
    setItems([...items, newItem])
    console.log(items)
  }
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm  onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onAddToCart = {onAddToCart} onDeleteItem ={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
