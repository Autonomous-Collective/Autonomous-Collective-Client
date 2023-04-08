import React, { useState } from "react";
import {
  ProductCard,
  EditProductForm,
  EditUserAdminForm,
  AddProductForm,
  TagsSectionAdmin,
} from "./";
import {
  deactivateProductCall,
  activateProductCall,
  adminEditUserCall,
  deactivateUserCall,
  addTagToProductCall,
  removeTagFromProductCall,
} from "../API-Adapter";

const AdminPage = ({ allProducts, allUsers, token, allTags }) => {
  const [tagToAdd, setTagToAdd] = useState("");
  const [tagToRemove, setTagToRemove] = useState("");
  const [isError, setIsError] = useState(false);

  const toggleForm = (id) => {
    let form = document.getElementById(`edit-product-form${id}`);

    if (form.style.display === "flex") {
      form.style.display = "none";
    } else {
      form.style.display = "flex";
    }
  };

  const toggleEditUser = (userId) => {
    let editUserForm = document.getElementById(`edit-user-form${userId}`);

    if (editUserForm.style.display === "flex") {
      editUserForm.style.display = "none";
    } else {
      editUserForm.style.display = "flex";
    }
  };
  const toggleAddProduct = () => {
    let addProductForm = document.getElementById(`add-product-form`);

    if (addProductForm.style.display === "flex") {
      addProductForm.style.display = "none";
    } else {
      addProductForm.style.display = "flex";
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

  const deleteUser = async (userId) => {
    const response = await deactivateUserCall(token, userId);
    if (response.success) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const activateProduct = async (id) => {
    const response = await activateProductCall(token, id);
    if (response.success) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const addTagToProduct = async (productId) => {
    const response = await addTagToProductCall(token, tagToAdd, productId);

    if (response.success) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const removeTagFromProduct = async (productId, tagToRemove) => {
    let tagId = 0;

    for (let i = 0; i < allTags.length; i++) {
      if (allTags[i].name == tagToRemove) {
        tagId = allTags[i].id;
        break;
      }
    }

    const response = await removeTagFromProductCall(token, tagId, productId);

    if (response.success) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <>
      <h1>I am the Admin Page</h1>
      <button
        onClick={() => {
          toggleAddProduct();
        }}
      >
        Add Product
      </button>
      <div className="display-none" id="add-product-form">
        <AddProductForm token={token} />
      </div>
      <h1>Product List Active products</h1>
      {allProducts.map((product, idx) => {
        console.log(product.tags, "Product.tags");
        return product.isActive ? (
          <div key={`${idx} on productCard map in admin`}>
            <ProductCard product={product} />
            <button
              onClick={() => {
                toggleForm(product.id);
              }}
            >
              Edit Product
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTagToProduct(product.id);
              }}
            >
              <label>Select Tag to Add to Product</label>
              <select
                onChange={(e) => {
                  setTagToAdd(e.target.value);
                }}
              >
                <option>Select A Tag</option>
                {allTags.map((tag) => {
                  return product.tags.includes(tag.name) ? null : (
                    <option value={tag.name}>{tag.name}</option>
                  );
                })}
              </select>
              <button type="submit">Add tag to Product</button>
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                removeTagFromProduct(product.id, tagToRemove);
              }}
            >
              <label>Remove Tags from this product</label>
              <select
                onChange={(e) => {
                  setTagToRemove(e.target.value);
                }}
              >
                <option>Please select a tag</option>
                {product.tags.map((tag, idx) => {
                  return <option value={tag}>{tag}</option>;
                })}
              </select>
              <button type="submit">Remove Tag</button>
            </form>
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
          </div>
        ) : null;
      })}
      <h1>Product List InActive products</h1>
      {allProducts.map((product, idx) => {
        return !product.isActive ? (
          <div key={`${idx} on productCard deactivated map in admin`}>
            <ProductCard product={product} />
            <button>Edit Product</button>
            <button
              onClick={() => {
                activateProduct(product.id);
              }}
            >
              Activate Product
            </button>
          </div>
        ) : null;
      })}

      <TagsSectionAdmin allTags={allTags} token={token}/>
      <h1>User List</h1>
      {allUsers.map((user, idx) => {
        return (
          <div key={`${idx} on users map in admin`}>
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

            <button
              onClick={() => {
                toggleEditUser(user.id);
              }}
            >
              Edit User
            </button>
            <div id={`edit-user-form${user.id}`} className="display-none">
              <EditUserAdminForm
                name={user.name}
                email={user.email}
                isAdmin={user.isAdmin}
                isActive={user.isActive}
                token={token}
                userId={user.id}
              />
            </div>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button>
          </div>
        );
      })}
    </>
  );
};

export default AdminPage;
