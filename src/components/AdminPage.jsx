import React from "react";
import { ProductCard, EditProductForm } from "./";
import { deactivateProductCall } from "../API-Adapter";

const AdminPage = ({ allProducts, allUsers, token }) => {
  const toggleForm = (id) => {
    let form = document.getElementById(`edit-product-form${id}`);

    if (form.style.display === "flex") {
      form.style.display = "none";
    } else {
      form.style.display = "flex";
    }
  };

  const deactivateProduct = async (id) => {
    const response = await deactivateProductCall(token, id);
    if (response.success) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <>
      <h1>I am the Admin Page</h1>
      <button>Add Product</button>
      <h1>Product List Active products</h1>
      {allProducts.map((product) => {
        return product.isActive ? (
          <>
            <ProductCard product={product} />
            <button
              onClick={() => {
                toggleForm(product.id);
              }}
            >
              Edit Product
            </button>
            <div className="display-none" id={`edit-product-form${product.id}`}>
              <EditProductForm token={token} product={product} />
            </div>
            <button
              onClick={() => {
                deactivateProduct(product.id);
              }}
            >
              Dectivate Product
            </button>
          </>
        ) : null;
      })}
      <h1>Product List InActive products</h1>
      {allProducts.map((product) => {
        return !product.isActive ? (
          <>
            <ProductCard product={product} />
            <button>Edit Product</button>
            <button>Activate Product</button>
          </>
        ) : null;
      })}

      <h1>User List</h1>
      {allUsers.map((user) => {
        return (
          <>
            <h1>Name: {user.name}</h1>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>
              isAdmin: {user.isAdmin ? <span>true</span> : <span>false</span>}{" "}
            </p>
            <p>
              isGuest: {user.isGuest ? <span>true</span> : <span>false</span>}{" "}
            </p>
            <p>
              isActive: {user.isActive ? <span>true</span> : <span>false</span>}{" "}
            </p>

            <button>Edit User</button>
            <button>Delete User</button>
          </>
        );
      })}
    </>
  );
};

export default AdminPage;
