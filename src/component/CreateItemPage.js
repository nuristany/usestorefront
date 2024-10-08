


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
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          "https://django-rail-production-f714.up.railway.app/store/category/",{

            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
       
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const accessToken = localStorage.getItem("access");
  //   try {
  //     // Fetch the authenticated user's data to get the user ID (seller ID)
  //     const response = await axios.get("https://django-rail-production-f714.up.app/auth/users/me", {
  //       headers: {
  //         Authorization: `JWT ${accessToken}`,
  //       },
  //     });
  //     const sellerId = response.data.id;
  
  //     // Prepare the form data for item creation
  //     const itemData = {
  //       title: formData.title,
  //       description: formData.description,
  //       price: formData.price,
  //       condition: formData.condition,
  //       category: formData.category, // Use the selected category ID from the form data
  //       seller: sellerId,
  //     };
  
  //     // Create the item
  //     const itemResponse = await axios.post(
  //       "https://django-rail-production-f714.up.railway.app/store/items/",
  //       itemData,
  //       {
  //         headers: {
  //           Authorization: `JWT ${accessToken}`,
  //         },
  //       }
  //     );
  
  //     const itemId = itemResponse.data.id;
  
  //     // Prepare the form data for image upload
  //     const formDataForUpload = new FormData();
  //     formDataForUpload.append("image", formData.image);
  
  //     // Upload the image for the item
  //     const imageResponse = await axios.post(
  //       `https://django-rail-production-f714.up.railway.app/store/items/${itemId}/images/`,
  //       formDataForUpload,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `JWT ${accessToken}`,
  //         },
  //       }
  //     );
  
  //     console.log("Image posted successfully:", imageResponse.data);
  
  //     // Clear the form data after successful submission
  //     setFormData({
  //       title: "",
  //       description: "",
  //       price: "",
  //       condition: "",
  //       category: "",
  //       image: null,
  //     });
  
  //     // Navigate to the home page after successful submission
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error:", error.response.data);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("access");
    try {
      const response = await axios.get("https://django-rail-production-f714.up.railway.app/auth/users/me", {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });
  
      if (!response || !response.data) {
        throw new Error("Failed to fetch user data");
      }
  
      const sellerId = response.data.id;
  
      // Prepare the form data for item creation
      const itemData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        condition: formData.condition,
        category: formData.category, // Use the selected category ID from the form data
        seller: sellerId,
      };
  
      // Create the item
      const itemResponse = await axios.post(
        "https://django-rail-production-f714.up.railway.app/store/items/",
        itemData,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
  
      if (!itemResponse || !itemResponse.data) {
        throw new Error("Failed to create item");
      }
  
      const itemId = itemResponse.data.id;
  
      // Prepare the form data for image upload
      const formDataForUpload = new FormData();
      formDataForUpload.append("image", formData.image);
  
      // Upload the image for the item
      const imageResponse = await axios.post(
        `https://django-rail-production-f714.up.railway.app/store/items/${itemId}/images/`,
        formDataForUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
  
      console.log("Image posted successfully:", imageResponse.data);
  
      // Clear the form data after successful submission
      setFormData({
        title: "",
        description: "",
        price: "",
        condition: "",
        category: "",
        image: null,
      });
  
      // Navigate to the home page after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
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





