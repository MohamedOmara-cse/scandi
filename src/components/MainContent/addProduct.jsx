import { useState } from "react";
import axios from "axios";
import Nav from "../Layout/Navbar";
function AddProduct() {
  let typeCode = {
    furniture: "3",
    book: "2",
    dvd: "1",
  };
  const baseUrl = "https://pr0duct-list.herokuapp.com/api/products";
  const [productType, setProductType] = useState("");
  const [productFields, setProductFields] = useState({
    sku: "",
    name: "",
    price: "",
    width: "",
    height: "",
    length: "",
    weight: "",
    size: "",
  });
  const [errors, setErrors] = useState({});

  const handleProductTypeChange = (event) => {
    const selectedType = event.target.value;
    setProductType(selectedType);
    setProductFields({
      sku: "",
      name: "",
      price: "",
      width: "",
      height: "",
      length: "",
      weight: "",
      size: "",
    });
    setErrors({});
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setProductFields({ ...productFields, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSave = () => {
    const validationErrors = {};
    if (!productFields.sku) {
      validationErrors.sku = "SKU is required";
    }
    if (!productFields.name) {
      validationErrors.name = "Name is required";
    }
    if (!productFields.price) {
      validationErrors.price = "Price is required";
    } else if (isNaN(productFields.price)) {
      validationErrors.price = "Price must be a number";
    }
    if (productType === "furniture") {
      if (!productFields.width) {
        validationErrors.width = "Width is required";
      } else if (isNaN(productFields.width)) {
        validationErrors.width = "Width must be a number";
      }
      if (!productFields.height) {
        validationErrors.height = "Height is required";
      } else if (isNaN(productFields.height)) {
        validationErrors.height = "Height must be a number";
      }
      if (!productFields.length) {
        validationErrors.length = "Length is required";
      } else if (isNaN(productFields.length)) {
        validationErrors.length = "Length must be a number";
      }
    } else if (productType === "book") {
      if (!productFields.weight) {
        validationErrors.weight = "Weight is required";
      } else if (isNaN(productFields.weight)) {
        validationErrors.weight = "Weight must be a number";
      }
    } else if (productType === "dvd") {
      if (!productFields.size) {
        validationErrors.size = "Size is required";
      } else if (isNaN(productFields.size)) {
        validationErrors.size = "Size must be a number";
      }
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(baseUrl, {
          type_id: typeCode[productType],
          ...productFields,
        })
        .then((response) => {
          // do something with successful response
        })
        .catch((error) => {
          // handle error
        });
      console.log(productFields);
    }
  };
  const cancleHandler = () => {
    setProductType("");
    setProductFields({
      sku: "",
      name: "",
      price: "",
      width: "",
      height: "",
      length: "",
      weight: "",
      size: "",
    });
    setErrors({});
  };

  return (
    <div>
      <Nav title="Add Product">
        <div>
          <button
            onClick={handleSave}
            className="focus:shadow-outline mr-2 rounded-full bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none"
          >
            Save
          </button>
          <button
            onClick={cancleHandler}
            className="focus:shadow-outline rounded-full bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </Nav>

      <form className="mt-4 p-10">
        <div className="mb-4">
          <label className="mb-2 block font-bold" htmlFor="sku">
            SKU:
          </label>
          <input
            id="sku"
            className={`focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none ${
              errors.sku ? "border-red-500" : ""
            }`}
            type="text"
            name="sku"
            onChange={handleFieldChange}
          />
          {errors.sku && <p className="text-red-500">{errors.sku}</p>}
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            className={`focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none ${
              errors.name ? "border-red-500" : ""
            }`}
            type="text"
            name="name"
            onChange={handleFieldChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold" htmlFor="price">
            Price:
          </label>
          <input
            id="price"
            className={`focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none ${
              errors.price ? "border-red-500" : ""
            } `}
            type="text"
            name="price"
            onChange={handleFieldChange}
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold" htmlFor="productType">
            Product Type:
          </label>
          <select
            id="productType"
            className="focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none"
            value={productType}
            onChange={handleProductTypeChange}
          >
            <option value="">Select a product type</option>
            <option value="furniture">Furniture</option>
            <option value="book">Book</option>
            <option value="dvd">DVD</option>
          </select>
        </div>
        {productType === "furniture" && (
          <>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="width">
                Width:
              </label>
              <input
                id="width"
                className={`focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none ${
                  errors.width ? "border-red-500" : ""
                }`}
                type="text"
                name="width"
                onChange={handleFieldChange}
              />
              {errors.width && <p className="text-red-500">{errors.width}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="height">
                Height:
              </label>
              <input
                id="height"
                className={`focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none ${
                  errors.height ? "border-red-500" : ""
                }`}
                type="text"
                name="height"
                onChange={handleFieldChange}
              />
              {errors.height && <p className="text-red-500">{errors.height}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="length">
                Length:
              </label>
              <input
                id="length"
                className={`focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none ${
                  errors.length ? "border-red-500" : ""
                }`}
                type="text"
                name="length"
                onChange={handleFieldChange}
              />
              {errors.length && <p className="text-red-500">{errors.length}</p>}
            </div>
          </>
        )}
        {productType === "book" && (
          <div className="mb-4">
            <label className="mb-2 block font-bold" htmlFor="weight">
              Weight:
            </label>
            <input
              id="weight"
              className={`focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none ${
                errors.weight ? "border-red-500" : ""
              }`}
              type="text"
              name="weight"
              onChange={handleFieldChange}
            />
            {errors.weight && <p className="text-red-500">{errors.weight}</p>}
          </div>
        )}
        {productType === "dvd" && (
          <div className="mb-4">
            <label className="mb-2 block font-bold" htmlFor="size">
              Size:
            </label>
            <input
              id="size"
              className={`focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none ${
                errors.size ? "border-red-500" : ""
              }`}
              type="text"
              name="size"
              onChange={handleFieldChange}
            />
            {errors.size && <p className="text-red-500">{errors.size}</p>}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
