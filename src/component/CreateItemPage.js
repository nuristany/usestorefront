
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateItemPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    condition: "",
    category: "",
    images: [null, null],
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

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const updatedImages = [...formData.images];
    updatedImages[index] = file;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("access");
    try {
      // Fetch the authenticated user's data to get the user ID (seller ID)
      const response = await axios.get(
        "https://web-production-036f.up.railway.app/auth/users/me",
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
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
        "https://web-production-036f.up.railway.app/store/items/",
        itemData,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );

      const itemId = itemResponse.data.id;

      // Prepare the form data for image upload
      formData.images.forEach(async (image, index) => {
        if (image) {
          const formDataForUpload = new FormData();
          formDataForUpload.append("image", image);

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

          console.log(`Image ${index + 1} posted successfully:`, imageResponse.data);
        }
      });

      // Clear the form data after successful submission
      setFormData({
        title: "",
        description: "",
        price: "",
        condition: "",
        category: "",
        images: [null, null],
      });

      // Navigate to the home page after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response.data);
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
            <label>Image 1:</label>
            <input type="file" name="image1" onChange={(e) => handleFileChange(e, 0)} />
          </div>
          <div>
            <label>Image 2:</label>
            <input type="file" name="image2" onChange={(e) => handleFileChange(e, 1)} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateItemPage;


// import React, { useState, useEffect } from "react";
// import { useNavigate} from "react-router-dom";
// import axios from "axios";

// function CreateItemPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     description: "",
//     condition: "",
//     category: "",
//     image: null,
//   });

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
        
//         const response = await axios.get(
//           "https://web-production-036f.up.railway.app/store/category/"
//         );
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, image: file });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const accessToken = localStorage.getItem("access");
//     try {
//       // Fetch the authenticated user's data to get the user ID (seller ID)
//       const response = await axios.get("https://web-production-036f.up.railway.app/auth/users/me", {
//         headers: {
//           Authorization: `JWT ${accessToken}`,
//         },
//       });
//       const sellerId = response.data.id;
  
//       // Prepare the form data for item creation
//       const itemData = {
//         title: formData.title,
//         description: formData.description,
//         price: formData.price,
//         condition: formData.condition,
//         category: formData.category, // Use the selected category ID from the form data
//         seller: sellerId,
//       };
  
//       // Create the item
//       const itemResponse = await axios.post(
//         "https://web-production-036f.up.railway.app/store/items/",
//         itemData,
//         {
//           headers: {
//             Authorization: `JWT ${accessToken}`,
//           },
//         }
//       );
  
//       const itemId = itemResponse.data.id;
  
//       // Prepare the form data for image upload
//       const formDataForUpload = new FormData();
//       formDataForUpload.append("image", formData.image);
  
//       // Upload the image for the item
//       const imageResponse = await axios.post(
//         `https://web-production-036f.up.railway.app/store/items/${itemId}/images/`,
//         formDataForUpload,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       console.log("Image posted successfully:", imageResponse.data);
  
//       // Clear the form data after successful submission
//       setFormData({
//         title: "",
//         description: "",
//         price: "",
//         condition: "",
//         category: "",
//         image: null,
//       });
  
//       // Navigate to the home page after successful submission
//       navigate("/");
//     } catch (error) {
//       console.error("Error:", error.response.data);
//     }
//   };
  

//   return (
//     <div className="add-item-container">
//       <div className="create-form">
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div>
//             <label>Title:</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Description:</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Price:</label>
//             <input
//               type="text"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Condition:</label>
//             <input
//               type="text"
//               name="condition"
//               value={formData.condition}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Category:</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//             >
//               <option value="">Select a category</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>Image:</label>
//             <input type="file" name="image" onChange={handleFileChange} />
            
//           </div>
//           <div>
//             <label>Image2:</label>
//             <input type="file" name="image" onChange={handleFileChange} />
            
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateItemPage;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function CreateItemPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     description: "",
//     condition: "",
//     category: "",
//     images: [], // Use an array to store multiple images
//   });

//   const [categories, setCategories] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           "https://web-production-036f.up.railway.app/store/category/"
//         );
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files); // Convert FileList to array
//     setFormData({ ...formData, images: files });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const accessToken = localStorage.getItem("access");
//     console.log("Access Token:", accessToken);
//     try {
//       // Fetch the authenticated user's data to get the user ID (seller ID)
//       const response = await axios.get(
//         "https://web-production-036f.up.railway.app/auth/users/me",
//         {
//           headers: {
//             Authorization: `JWT ${accessToken}`,
//           },
//         }
//       );

//       const sellerId = response.data.id; // Assuming the response contains the user ID

//       // Fetch categories to get the category ID
//       const categoryResponse = await axios.get(
//         "https://web-production-036f.up.railway.app/store/category/"
//       );
//       const categoryId = categoryResponse.data[0].id; // Assuming the first category is selected

//       // Prepare the form data for item creation
//       const itemData = {
//         title: formData.title,
//         description: formData.description,
//         price: formData.price,
//         condition: formData.condition,
//         category: categoryId, // Assign the category ID
//         seller: sellerId, // Assign the seller ID
//       };

//       // Create the item
//       const itemResponse = await axios.post(
//         "https://web-production-036f.up.railway.app/store/items/",
//         itemData,
//         {
//           headers: {
//             Authorization: `JWT ${accessToken}`,
//           },
//         }
//       );

//       console.log("Item creation response:", itemResponse.data);

//       const itemId = itemResponse.data.id;

//       // Upload images for the item
//       formData.images.forEach(async (image, index) => {
//         const formDataForUpload = new FormData();
//         formDataForUpload.append("image", image);

//         const imageResponse = await axios.post(
//           `https://web-production-036f.up.railway.app/store/items/${itemId}/images/`,
//           formDataForUpload,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `JWT ${accessToken}`,
//             },
//           }
//         );

//         console.log(`Image ${index + 1} posted successfully:`, imageResponse.data);
//       });

//       // Clear any previous error message
//       setErrorMessage("");

//       // Reset form data
//       setFormData({
//         title: "",
//         description: "",
//         price: "",
//         condition: "",
//         category: "",
//         images: [],
//       });

//       // Optionally, navigate to another page
//       navigate("/");
//     } catch (error) {
//       // Set error message to display to the user
//       setErrorMessage("Failed to create item. Please try again later.");
//       // Log the error response from the server
//       console.error("Error:", error.response.data);
//     }
//   };

//   return (
//     <div className="add-item-container">
//       <div className="create-form">
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div>
//             <label>Title:</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Description:</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Price:</label>
//             <input
//               type="text"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Condition:</label>
//             <input
//               type="text"
//               name="condition"
//               value={formData.condition}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Category:</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//             >
//               <option value="">Select a category</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>Images:</label>
//             <input
//               type="file"
//               name="images"
//               onChange={handleFileChange}
//               multiple // Allow multiple file selection
//             />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//       </div>
//     </div>
//   );
// }

// export default CreateItemPage;

