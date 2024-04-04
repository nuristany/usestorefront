


import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

function CreateItemPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    condition: "",
    category: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        
        const response = await axios.get(
          "https://web-production-036f.up.railway.app/store/category/"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("access");
    console.log("Access Token:", accessToken);
    try {
      // Fetch the authenticated user's data to get the user ID (seller ID)
      const accessToken = localStorage.getItem("access");
      const response = await axios.get("https://web-production-036f.up.railway.app/auth/users/me", {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });

      const sellerId = response.data.id; // Assuming the response contains the user ID

      // Fetch categories to get the category ID
      const categoryResponse = await axios.get(
        "https://web-production-036f.up.railway.app/store/category/"
      );
      const categoryId = categoryResponse.data[0].id; // Assuming the first category is selected

      // Prepare the form data for item creation
      const itemData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        condition: formData.condition,
        category: categoryId, // Assign the category ID
        seller: sellerId, // Assign the seller ID
      };

      // Create the item
      //const accessToken = localStorage.getItem("access");
      const itemResponse = await axios.post(
        "https://web-production-036f.up.railway.app/store/items/",itemData,{
          
          headers: {
            Authorization: `JWT ${accessToken}`,
          },

        }
      );

      // Log the response from the server
      console.log("Item creation response:", itemResponse.data);

      const itemId = itemResponse.data.id;

      // Prepare the form data for image upload
      const formDataForUpload = new FormData();
      formDataForUpload.append("image", formData.image);

      // Upload the image for the item
      
      const imageResponse = await axios.post(
        `https://web-production-036f.up.railway.app/store/items/${itemId}/images/`,
        formDataForUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image posted successfully:", imageResponse.data);
      setFormData({
        title: "",
        description: "",
        price: "",
        condition: "",
        category: "",
        image: null,
      });
    } catch (error) {
      // Log the error response from the server
      console.error("Error:", error.response.data);
    }
    navigate('/');
  };

  return (
    <div className="add-item-container">
      <div className="create-form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Condition:</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Image:</label>
            <input type="file" name="image" onChange={handleFileChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateItemPage;