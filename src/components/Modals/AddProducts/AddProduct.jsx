import React, { useEffect, useState } from "react";
import classes from "./AddProduct.module.css";
import uploadImage from "../../../assets/upload_image.svg";
import deleteIcon from "../../../assets/delete_red.svg";
import ToastMessage from "../../common-components/ToastMessage/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategoryApi } from "../../../Store/productSlice";
import Loading from "../../Loading/ButtonLoading";
import DeleteRound from "../../common-components/RoundActionButton/DeleteRound";

const AddProduct = (props) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [categoryId, setCategoryId] = useState(props.category || "");
  const [productImage, setProductImage] = useState({
    image1: props.image?.[0]?.url || "",
    image2: props.image?.[1]?.url || "",
    image3: props.image?.[2]?.url || "",
    image4: props.image?.[3]?.url || "",
  });
  const [dimensions, setDimensions] = useState({
    startDimension: props.startDimension || "",
    endDimension: props.endDimension || "",
  });
  const [data, setData] = useState({
    title: props.title || "",
    subTitle: props.subTitle || "",
    subCategory: props.subCategory || "",
    metal: props.metal || "",
    dimensions: props.dimensions || "",
    length: props.length || "",
    weight: props.weight || "",
    image: props.image || [],
  });
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.products.category);
  const subcategorys = useSelector((state) => state.products.subCategory);

  const handleImageSelect = (event) => {
    const files = event.target.files;
    const currentSelectedImagesCount = selectedImages.length;
    const remainingSlots = 4 - currentSelectedImagesCount;

    if (files.length <= remainingSlots) {
      const imageNames = Array.from(files).map((file) => file.name);
      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        ...imageNames,
      ]);
      setWarningMessage("");
      const readerPromises = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readerPromises)
        .then((base64Images) => {
          setData({ ...data, image: [...data.image, ...base64Images] });
        })
        .catch((error) => {
          console.error("Error reading images:", error);
        });
    } else {
      setWarningMessage(`Select up to ${remainingSlots} more images`);
    }
  };

  const handleImageRemove = (imageName) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((name) => name !== imageName)
    );

    setData((prevInputData) => {
      const updatedImages = prevInputData.image.filter((_, index) => {
        return index !== selectedImages.indexOf(imageName);
      });

      return {
        ...prevInputData,
        image: updatedImages,
      };
    });
  };

  const handleToast = () => {
    setShowToast(!showToast);
    setWarningMessage("");
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(getSubCategoryApi(categoryId));
    }
  }, [categoryId]);

  const handleAddButtonClick = () => {
    const inputData = {
      title: data.title,
      subTitle: data.subTitle,
      category: categoryId,
      subCategory: data.subCategory,
      productInfo: {
        metal: data.metal,
        dimensions: `${dimensions.startDimension}mm x ${dimensions.endDimension}mm`,
        length: `${data.length}mm`,
        weight: `${data.weight}g`,
      },
      images: data.image,
    };

    props.handleAdd(inputData);
  };

  const handleProductImageSelect = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      const imageKey = `image${index}`;
      setProductImage((prevProductImage) => ({
        ...prevProductImage,
        [imageKey]: imageURL,
      }));

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;
        setData((prevInputData) => ({
          ...prevInputData,
          image: [
            ...prevInputData.image.slice(0, index),
            base64Image,
            ...prevInputData.image.slice(index + 1),
          ],
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={classes.addProductModal_main}>
        <div className={classes.addProductModal_card}>
          <div className={classes.addProductModal_heading_section}>
            <h1 className={classes.addProductModal_heading}>{props.heading}</h1>
          </div>
          <form action="" className={classes.addProductModal_form}>
            <div className={classes.addProductModal_firstSection}>
              <label
                htmlFor="Category"
                className={classes.addProductModal_label}
              >
                Category
              </label>
              <div>
                <select
                  id="cars"
                  className={classes.addProductModal_inputField}
                  onChange={(e) => setCategoryId(e.target.value)}
                  value={categoryId}
                >
                  <option value="">Select Category</option>
                  {categorys?.Categories?.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <label
                htmlFor="subcategory"
                className={classes.addProductModal_label}
              >
                Subcategory
              </label>
              <div>
                <select
                  id="cars"
                  className={classes.addProductModal_inputField}
                  value={data.subCategory}
                  onChange={(e) =>
                    setData({ ...data, subCategory: e.target.value })
                  }
                >
                  <option value="">Select Subcategory</option>
                  {subcategorys?.SubCategories?.map((subcategory) => (
                    <option key={subcategory?._id} value={subcategory?._id}>
                      {subcategory?.subCategoryName}
                    </option>
                  ))}
                </select>
              </div>
              <label htmlFor="Title" className={classes.addProductModal_label}>
                Title
              </label>
              <textarea
                className={classes.addProductModal_inputField}
                name="title"
                id=""
                cols="10"
                rows="3"
                placeholder="Enter the title here"
                style={{ resize: "none" }}
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              ></textarea>
              <label
                htmlFor="Subheading"
                className={classes.addProductModal_label}
              >
                Subheading
              </label>
              <input
                type="text"
                placeholder="Enter the subheading"
                className={classes.addProductModal_inputField}
                value={data.subTitle}
                onChange={(e) => setData({ ...data, subTitle: e.target.value })}
              />
              <label
                htmlFor="Product images"
                className={classes.addProductModal_label}
              >
                Product images
              </label>
              {props.image ? (
                <div className={classes.product_images_container}>
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      className={classes.product_image_container}
                      key={index}
                    >
                      <img src={productImage[`image${index}`]} alt="" />
                      <input
                        type="file"
                        accept="images/*"
                        onChange={(event) =>
                          handleProductImageSelect(event, index)
                        }
                        className={classes.product_image_picker}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {selectedImages.length < 4 && (
                    <div className={classes.addProductModal_image_container}>
                      <div className={classes.addProductModal_image}>
                        <img
                          className={classes.addProductModal_img}
                          src={uploadImage}
                          alt=""
                        />
                        <h4 className={classes.addProductModal_imgdesc}>
                          Drag & drop images or <span>Browse</span>
                        </h4>
                        <p className={classes.addProductModal_imgcount}>
                          Select exactly 4 images
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className={classes.addProductModal_file_selector}
                      />
                    </div>
                  )}

                  {selectedImages.length > 0 && (
                    <ul className={classes.addProductModal_imageName_container}>
                      {selectedImages.map((imageName, index) => (
                        <li
                          key={index}
                          className={classes.addProductModal_imageName}
                        >
                          {imageName}{" "}
                          <img
                            src={deleteIcon}
                            alt="dele"
                            className={classes.delete_icon}
                            onClick={() => handleImageRemove(imageName)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
            <div className={classes.addProductModal_firstSection}>
              <label htmlFor="Metal" className={classes.addProductModal_label}>
                Metal
              </label>
              <textarea
                className={classes.addProductModal_inputField}
                name="title"
                id=""
                cols="10"
                rows="3"
                placeholder="Enter type of metal and metals used"
                style={{ resize: "none" }}
                value={data.metal}
                onChange={(e) => setData({ ...data, metal: e.target.value })}
              ></textarea>

              <label
                htmlFor="Dimensions"
                className={classes.addProductModal_label}
              >
                Dimensions
              </label>
              <div className={classes.addProductModal_dimension}>
                <input
                  type="number"
                  placeholder="mm"
                  className={`${classes.addProductModal_inputField} ${classes.decreasedWidth}`}
                  value={dimensions.startDimension}
                  onChange={(e) =>
                    setDimensions({
                      ...dimensions,
                      startDimension: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="mm"
                  className={`${classes.addProductModal_inputField} ${classes.decreasedWidth}`}
                  value={dimensions.endDimension}
                  onChange={(e) =>
                    setDimensions({
                      ...dimensions,
                      endDimension: e.target.value,
                    })
                  }
                />
              </div>
              <label htmlFor="Length" className={classes.addProductModal_label}>
                Length
              </label>
              <input
                type="number"
                placeholder="mm"
                className={`${classes.addProductModal_inputField} ${classes.decreasedWidth}`}
                value={data.length}
                onChange={(e) => setData({ ...data, length: e.target.value })}
              />
              <label htmlFor="" className={classes.addProductModal_label}>
                Weight
              </label>
              <input
                type="number"
                placeholder="g"
                className={`${classes.addProductModal_inputField} ${classes.decreasedWidth}`}
                value={data.weight}
                onChange={(e) => setData({ ...data, weight: e.target.value })}
              />
            </div>
          </form>
          <div className={classes.addProductModal_bottom_section}>
            <button
              className={classes.addProductModal_cancelButton}
              onClick={props.handleCancel}
            >
              Cancel
            </button>
            <button
              onClick={handleAddButtonClick}
              className={classes.addProductModal_addButton}
            >
              {props.isLoading ? <Loading /> : "Add"}
            </button>
          </div>
          {props.deleteClick && (
            <div className={classes.delete_Container}>
              <DeleteRound onClick={props.deleteClick} />
            </div>
          )}
        </div>
        <div
          className={classes.addCategoryModal_modal_closer}
          onClick={props.handleCancel}
        ></div>
      </div>
      {warningMessage && (
        <div className={classes.toast_messager}>
          <ToastMessage
            handleToast={handleToast}
            icon=""
            message={warningMessage}
            background="#FFA500"
          />
        </div>
      )}
    </>
  );
};

export default AddProduct;
