import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminUser = localStorage.getItem("admin");
    if (!adminUser) {
      toast.success("Access Denied. Admins Only.");
      navigate("/");
    }
  });

  const [AdminProducts, setAdminProducts] = useState([]);  // admin ko apne  product dekne ke liye 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("https://tech-bazaar-z546.onrender.com/admin/products", {
          method: "GET",
          headers: {

            "Authorization": token
          }
        });
        const data = await res.json();
        if (res.ok) {
          setAdminProducts(data);
        } else {
          toast.success("Error: " + data.message);
        }
      }
      catch (error) {
        console.log(error);
        toast.success("Something went wrong");
      }
    }; fetchProducts();

  }, []);


   const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://tech-bazaar-z546.onrender.com/admin/delete-product/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.ok) {
                setAdminProducts(AdminProducts.filter((item) => item._id !== id));
                toast.success("Deleted!");
            } else {
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }
};

  const [isEditing, setIsEditing] = useState(false);  // edit update mode ke liye
  const handleEdit = (item) => {
    setAdminData({
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image,
        description: item.description,
        _id: item._id
    });
    setIsEditing(true);
    window.scrollTo(0, 0);
};



  const [AdminData, setAdminData] = useState({     // admin ka  product add karne ke liye
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...AdminData, [name]: value });
  };
  
 const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = isEditing 
        ? `http://localhost:3000/admin/update-product/${AdminData._id}` 
        : "http://localhost:3000/admin/add-product";
    const method = isEditing ? "PUT" : "POST";

    try {
        const res = await fetch(response, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(AdminData)
        });

        const data = await res.json();

        if (res.ok) {
            if (isEditing) {
                setAdminProducts(AdminProducts.map(p => p._id === AdminData._id ? data.key : p));
                setIsEditing(false);
            } else {
                setAdminProducts([...AdminProducts, data.product]);
            }
            setAdminData({ name: "", price: "", category: "", image: "", description: "" });
            toast.success(isEditing ? "Product Updated Successfully!" : "Product Added Successfully!");
        } else {
            toast.success("Error: " + data.message);
        }
    } catch (error) {
        console.log(error);
        toast.success("Something went wrong");
    }
};





  

  return (<>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative">


      <Link to="/"><button className=" hidden lg:flex absolute top-6 right-6 text-gray-500 hover:text-red-600 text-3xl font-bold"> &times;</button></Link>
      <Link to="/" className=' lg:hidden absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500  '><span className="text-2xl">←</span></Link>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4"> 
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input name='name' value={AdminData.name} onChange={handleChange} type="text" className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. MacBook Air M2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input name='price' value={AdminData.price} onChange={handleChange} type="number" className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input name='category' value={AdminData.category} onChange={handleChange} type="text" className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Laptop, Mobile, etc." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input name='image' value={AdminData.image} onChange={handleChange} type="text" className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://image-link.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name='description' value={AdminData.description} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-24" placeholder="Brief details about the product..."></textarea>
          </div>

          <button name='submit' type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-4">
             {isEditing ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>


    
    <div style={{  padding: "20px", background: "#f9f9f9", borderRadius: "10px" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Admin Product List</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
          <thead>
            <tr style={{ backgroundColor: "#333", color: "white" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Image</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Price</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Category</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {AdminProducts.map((item) => (
              <tr key={item._id} style={{ textAlign: "center" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.name}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>₹{item.price}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.category}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <button
                    onClick={()=> handleEdit(item)}
                    style={{ marginRight: "10px", padding: "5px 12px", backgroundColor: "#ffc107", border: "none", cursor: "pointer", borderRadius: "4px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={()=> handleDelete(item._id)}
                    style={{ padding: "5px 12px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
};

export default Admin;