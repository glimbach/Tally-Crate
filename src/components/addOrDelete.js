/* eslint-disable */
import React, {useState, useEffect} from 'react';
import BoxLogo from './logo.png'
import {useNavigate} from "react-router-dom";

const addOrDelete = () => {
    //hooks
const navigate = useNavigate();
const [textValue, setTextValue] = useState('');
const [imageValue, setImageValue] = useState('');
const [showInputs, setShowInputs] = useState(true);
//for items ion the box
const [newItem, setNewItem] = useState("");
const [items, setItems] = useState([]);
const [showEdit, setShowEdit] = useState(-1);
const [updatedText, setUpdatedText] = useState("");

const userName = JSON.parse(localStorage.getItem("user"));

function addItem() {//for items in the box
    // ! Check for empty item
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    // Add new item to items array
    setItems((oldList) => [...oldList, item]);

    // Reset newItem back to original state
    setNewItem("");
  }

  //FOR DELETING ITEMS
 
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  /* Edit an item text after creating it. */
  function editItem(id, newText) {
    // Get the current item
    const currentItem = items.filter((item) => item.id === id);

    // Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }



    useEffect(() => {
        const savedTextValue = localStorage.getItem('textValue');
        const savedImageValue = localStorage.getItem('imageValue');
    
        if (savedTextValue) {
          setTextValue(savedTextValue);
        }
    
        if (savedImageValue) {
          setImageValue(savedImageValue);
        }
    
        if (savedTextValue || savedImageValue) {
          setShowInputs(false); // Hide inputs if there are saved values
        }
      }, []);
    
      // Update local storage whenever the text input value changes
      const handleTextChange = (event) => {
        const value = event.target.value;
        setTextValue(value);
        localStorage.setItem('textValue', value);
      };
    
      // Update local storage whenever the image input value changes
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            setImageValue(imageDataUrl);
            localStorage.setItem('imageValue', imageDataUrl);
          };
          reader.readAsDataURL(file);
        }
      };
    
      const handleDisplay = () => {
        setShowInputs(false);
      };

    const handleLogout = () =>{ //handling logout
        localStorage.removeItem("loggedin");
        localStorage.removeItem("textValue");
        localStorage.removeItem("imageValue");
        navigate('/');
      };

  return ( //html start
    <div class='bg-[url(https://img.freepik.com/free-photo/close-up-warehouse-view_23-2148923142.jpg?t=st=1712775495~exp=1712779095~hmac=28eed57d40cee743ab53eb5208d0b0b4a96094ad42f2170e6571b95ac96b94c9&w=1800)]
     bg-cover bg-no-repeat bg-center h-screen'> {/*main div*/}

    <div className='mx-auto flex justify-between items-center p-4 bg-black'>
      {/* Left side */}

      <div className='flex items-center text-white'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2 cursor-pointer'>
          Tally<span className='font-bold'>Crate</span>
          </h1>
        <div><img src={BoxLogo} className='h-11'/></div>
      </div>

    <div className='text-white text-xl py-4 mr-10'>Add or Delete Items</div>

      <div className='flex'>
      <button 
      className="py-4 cursor-pointer relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left mr-10 text-white">
         {userName.name}
      </button>
      <button onClick={handleLogout}
      className="py-4 cursor-pointer relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left mr-10 text-white">
         Log out
      </button>
      </div>
    </div>

    <div className='relative w-full h-screen bg-zinc-900/90'> {/*Middle of the page*/}
    <div className='flex items-center h-screen'>
    <div className='w-[900px] h-[900px]  mx-auto bg-blue-100 p-8 rounded-2xl'>

    <div className='flex '>
    {showInputs ? (
        <div className='flex justify-center items-center h-full'>
          <div className='p-8'>
            <h1> Name the inventory
            <input
            className='border relative bg-white p-2 '
              type="text"
              value={textValue}
              onChange={handleTextChange}
              placeholder="Type something..."
            />
            </h1>
          </div>
          <div className='p-8'>
          <h1> Picture of the inventory:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            </h1>
          </div>
          <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' onClick={handleDisplay}>Save</button>
        </div>
      ) : (
        <div className='flex  items-center h-full mx-auto space-x-2 md:space-x-8 p-4'>
          <h1 className='text-5xl font-semibold text-blue-600/100 dark:text-blue-500/100 '>{textValue}</h1>
          {imageValue && (
              <img className=' relative w-55 h-60 border-double border-4 border-black ' src={imageValue} alt="Uploaded"/>
          )}
        </div>
      )}
      </div> {/*end of inventory pic and name*/}

      <div className='text-center'> {/*ADDING ITEMS*/}
        <h1 className='text-center text-4xl text-blue-600/100 dark:text-blue-500/100'>Add items in the inventory</h1>
        <input
        className='text-2xl py-1'
        type="text"
        placeholder="Add an item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button className='py-1 mt-8 relative bg-indigo-500 w-36 mx-4 h-' onClick={() => addItem()}>Add</button>

      <ul> {/* TO SHOW ITEMS */}
        {items.map((item) => {
          return (
            <div>
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  ❌
                </button>
              </li>

              {showEdit == item.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button className='text-black' onClick={() => editItem(item.id, updatedText)}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>

      </div>{/* END OF ADDING ITEMS*/}

    </div>
  </div>
  </div>
  </div>
  )
}

export default addOrDelete
