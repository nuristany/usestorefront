import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditItem = () => {
  const { itemId } = useParams();
  const [itemData, setItemData] = useState({
    title: "",
    price: "",
    description: "",
    condition: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          `https://web-production-036f.up.railway.app/store/items/${itemId}/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
        console.log("ResponseData:", response.data);
        setItemData(response.data);
      } catch (error) {
        setError("Failed to fetch item details"); // Set error state
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleEdit = async () => {
    const accessToken = localStorage.getItem("access");
    try {
      await axios.put(
        `https://web-production-036f.up.railway.app/store/items/${itemId}/`,
        itemData,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      // Handle successful edit, such as displaying a success message or redirecting to another page
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setItemData({ ...itemData, image: file });

    const accessToken = localStorage.getItem("access");

    try {
      // Check if the item already has an image
      if (itemData.images && itemData.images.length > 0) {
        // Extract the image ID from the item's image URL
        const imageId = itemData.images[0].id;

        // If it does, delete the existing image
        await axios.delete(
          `https://web-production-036f.up.railway.app/store/items/${itemId}/images/${imageId}`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
      }

      // Prepare the form data for image upload
      const formDataForUpload = new FormData();
      formDataForUpload.append("image", file);

      // Upload the new image for the item
      const imageResponse = await axios.post(
        `https://web-production-036f.up.railway.app/store/items/${itemId}/images/`,
        formDataForUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `JWT ${accessToken}`,
          },
        }
      );

      console.log("Image posted successfully:", imageResponse.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      await axios.delete(
        `https://web-production-036f.up.railway.app/store/items/${itemId}/`,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      // Handle successful deletion, such as displaying a success message or redirecting to another page
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="add-item-container">
      <div className="create-form">
        {error && <div>Error: {error}</div>}{" "}
        {/* Render error message if error exists */}
        <h2>Edit Item</h2>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={itemData.title}
          onChange={handleInputChange}
        />
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={itemData.price}
          onChange={handleInputChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={itemData.description}
          onChange={handleInputChange}
        />
        <label>Condition:</label>
        <input
          type="text"
          name="condition"
          value={itemData.condition}
          onChange={handleInputChange}
        />
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={itemData.category}
          onChange={handleInputChange}
        />
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <div className="edit-form-button">
          <button onClick={handleEdit}>Save Changes</button>
          <button className="btn-delete" onClick={handleDelete}>Delete Item</button>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
