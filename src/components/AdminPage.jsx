import React, { useState } from "react";
import {
  ProductCard,
  EditProductForm,
  EditUserAdminForm,
  AddProductForm,
  TagsSectionAdmin,
  MessageAlert,
} from "./";
import {
  deactivateProductCall,
  activateProductCall,
  adminEditUserCall,
  deactivateUserCall,
  addTagToProductCall,
  removeTagFromProductCall,
} from "../API-Adapter";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const AdminPage = ({ allProducts, allUsers, token, allTags }) => {
  const [tagToAdd, setTagToAdd] = useState("");
  const [tagToRemove, setTagToRemove] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage("You have successfully deactivated the product");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } else {
      setMessage("Something went wrong deactivating the product");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  };

  const deleteUser = async (userId) => {
    const response = await deactivateUserCall(token, userId);
    if (response.success) {
      setMessage("You have successfully deleted the user");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } else {
      setMessage("Something went wrong deactivating the user");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  };

  const activateProduct = async (id) => {
    const response = await activateProductCall(token, id);
    if (response.success) {
      setMessage("You have successfully activated the product");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } else {
      setMessage("Something went wrong activating the product");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  };

  const addTagToProduct = async (productId, productTags) => {
    const response = await addTagToProductCall(token, tagToAdd, productId);
    if (response.success) {
      setMessage("You have successfully added the tag to the product");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setMessage("Something went wrong adding the tag to the product");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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
      setMessage("You have successfully removed the tag from the product");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } else {
      setMessage("Error removing the tag from the product");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  };

  return (
    <>
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      <h1 style={{ textAlign: "center" }}>Admin Page</h1>
      <div id="addProductContainer">
        <div>
          <Button
            variant="primary"
            onClick={() => {
              toggleAddProduct();
            }}
          >
            Add Product
          </Button>
        </div>
        <div className="display-none" id="add-product-form">
          <AddProductForm token={token} />
        </div>
      </div>
      <h1 style={{ textAlign: "center" }}>Active Products</h1>
      {allProducts.map((product, idx) => {
        console.log(product.tags, "Product.tags");
        return product.isActive ? (
          <div
            id="activeProductPage"
            key={`${idx} on productCard map in admin`}
          >
            <ProductCard id="activeProductContainer" product={product} />
            <div id="activeProductContainerButtons">
              <Card>
                <div>
                  <Button
                    style={{ margin: "20px" }}
                    variant="primary"
                    onClick={() => {
                      toggleForm(product.id);
                    }}
                  >
                    Edit Product
                  </Button>
                  <div
                    className="display-none"
                    id={`edit-product-form${product.id}`}
                  >
                    <EditProductForm token={token} product={product} />
                  </div>
                </div>
                <Form.Group
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTagToProduct(product.id, product.tags);
                  }}
                >
                  <Form.Label style={{ marginLeft: "20px" }}>
                    Select Tag to Add to Product:
                  </Form.Label>
                  <div id="addTagFormButtons">
                    <Form.Select
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
                    </Form.Select>
                    <Button
                      onClick={() => {
                        addTagToProduct(product.id, product.tags);
                      }}
                      style={{ width: "250px" }}
                      variant="success"
                      type="submit"
                    >
                      Add Tag to Product
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group
                  onSubmit={(e) => {
                    e.preventDefault();
                    removeTagFromProduct(product.id, tagToRemove);
                  }}
                >
                  <Form.Label style={{ marginLeft: "20px" }}>
                    Remove Tags from this Product:
                  </Form.Label>
                  <div id="removeTagFormButtons">
                    <Form.Select
                      onChange={(e) => {
                        setTagToRemove(e.target.value);
                      }}
                    >
                      <option>Please select a tag</option>
                      {product.tags.map((tag, idx) => {
                        return <option value={tag}>{tag}</option>;
                      })}
                    </Form.Select>
                    <Button
                      onClick={() => {
                        removeTagFromProduct(product.id, tagToRemove);
                      }}
                      style={{ width: "250px" }}
                      variant="danger"
                      type="submit"
                    >
                      Remove Tag
                    </Button>
                  </div>
                </Form.Group>

                <Button
                  style={{ margin: "20px" }}
                  variant="danger"
                  onClick={() => {
                    deactivateProduct(product.id);
                  }}
                >
                  Deactivate Product
                </Button>
              </Card>
            </div>
          </div>
        ) : null;
      })}
      <h1 style={{ textAlign: "center" }}>Inactive Products</h1>
      <div id="inactiveProductPage">
        {allProducts.map((product, idx) => {
          return !product.isActive ? (
            <div key={`${idx} on productCard deactivated map in admin`}>
              <div id="">
                <ProductCard product={product} />
                <div>
                  <Button
                    style={{ margin: "20px" }}
                    variant="primary"
                    onClick={() => {
                      toggleForm(product.id);
                    }}
                  >
                    Edit Product
                  </Button>
                  <div
                    className="display-none"
                    id={`edit-product-form${product.id}`}
                  >
                    <EditProductForm token={token} product={product} />
                  </div>
                  <Button
                    variant="success"
                    onClick={() => {
                      activateProduct(product.id);
                    }}
                  >
                    Activate Product
                  </Button>
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
      <div>
        <TagsSectionAdmin allTags={allTags} token={token} />
      </div>
      <h1 style={{ textAlign: "center" }}>User List</h1>
      {allUsers.map((user, idx) => {
        return (
          <div id="adminUserCard" key={`${idx} on users map in admin`}>
            <Card style={{ width: "60vw", padding: "20px" }}>
              <Card.Text>Name: {user.name}</Card.Text>
              <Card.Text>ID: {user.id}</Card.Text>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>
                isAdmin: {user.isAdmin ? <span>true</span> : <span>false</span>}{" "}
              </Card.Text>
              <Card.Text>
                isGuest: {user.isGuest ? <span>true</span> : <span>false</span>}{" "}
              </Card.Text>
              <Card.Text>
                isActive:{" "}
                {user.isActive ? <span>true</span> : <span>false</span>}{" "}
              </Card.Text>
              <div>
                <Button
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  onClick={() => {
                    toggleEditUser(user.id);
                  }}
                >
                  Edit User
                </Button>
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
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete User
                </Button>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default AdminPage;
