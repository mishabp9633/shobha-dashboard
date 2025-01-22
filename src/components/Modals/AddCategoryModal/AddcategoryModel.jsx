import React, { useState } from "react";
import classes from "./AddCategoryModal.module.css";
import productImage from "../../../assets/product-image.svg";
import removeIcon from "../../../assets/remove_icon.svg";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import AddAgentModal from "../AddAgentModal/AddAgentModal";
import success from "../../../assets/toast_success.svg";
import ToastMessage from "../../common-components/ToastMessage/ToastMessage";
import DeleteRound from "../../common-components/RoundActionButton/DeleteRound";
import EditRound from "../../common-components/RoundActionButton/EditRound";
import {
  categoryDeleteApi,
  categoryGetApi,
  createCategoryApi,
  singleCategoryApi,
  updateCategoryApi,
} from "../../../Store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/ButtonLoading";

const AddcategoryModal = (props) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [updateToast, setUpdateToast] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.products.category);
  const singleCategory = useSelector((state) => state.products.singleCategory);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteConfirmation = (id) => {
    setCategoryId(id);
    setDeleteCategory(!deleteCategory);
  };
  const handleEditCategory = async (id) => {
    await dispatch(singleCategoryApi(id));
    setEditCategory(!editCategory);
  };

  const handleToast = () => {
    setShowToast(!showToast);
  };
  const handleUpdateToast = () => {
    setUpdateToast(!updateToast);
  };

  const handleDeleteToast = () => {
    setDeleteToast(!deleteToast);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;
        setData({ ...data, image: base64Image });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(
      createCategoryApi({ categoryName: data.name, image: data.image })
    ).then((response) => {
      if (response.payload) {
        handleToast();
        setSelectedImage(""), (data.name = "");
        setIsLoading(false);
        dispatch(categoryGetApi());
      }
    });
  };

  const category = categorys?.Categories;

  const handleUpdateCategroy = (input) => {
    setIsLoading(true);
    const data = {
      categoryName: input.fullName,
      id: singleCategory?._id,
      image: input.image,
    };
    dispatch(updateCategoryApi(data)).then((response) => {
      if (response.payload) {
        handleUpdateToast();
        handleEditCategory();
        setIsLoading(false);
        dispatch(categoryGetApi());
      }
    });
  };

  const handleDeleteCategory = () => {
    dispatch(categoryDeleteApi(categoryId)).then((response) => {
      if (response.payload) {
        handleDeleteToast();
        handleDeleteConfirmation();
        dispatch(categoryGetApi());
      }
    });
  };

  return (
    <>
      <div className={classes.addCategoryModal_main}>
        <div className={classes.addCategoryModal_card}>
          <div className={classes.addCategoryModal_heading_section}>
            <h1
              className={
                activeTab === "tab1"
                  ? classes.activeHeader
                  : classes.addCategoryModal_heading
              }
              onClick={() => handleTabChange("tab1")}
            >
              Add Category
            </h1>
            <h1
              className={
                activeTab === "tab2"
                  ? classes.activeHeader
                  : classes.addCategoryModal_heading
              }
              onClick={() => handleTabChange("tab2")}
            >
              Edit/Remove Category
            </h1>
          </div>
          {activeTab === "tab1" && (
            <form action="" className={classes.addCategoryModal_form}>
              <label htmlFor="" className={classes.addCategoryModal_label}>
                Category Title
              </label>
              <input
                type="text"
                value={data.name}
                className={classes.addCategoryModal_inputField}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <label htmlFor="" className={classes.addCategoryModal_label}>
                Category Image
              </label>
              <div className={classes.addCategoryModal_image_container}>
                <img
                  src={selectedImage || productImage}
                  alt="Profile"
                  className={classes.addCategoryModal_profile_image}
                />
                {selectedImage && (
                  <img
                    src={removeIcon}
                    alt="Remove"
                    className={classes.addCategoryModal_removeIcon}
                    onClick={() => {
                      setSelectedImage(null);
                      setData({ ...data, image: null });
                    }}
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className={classes.addCategoryModal_imagePicker}
              />
              <div className={classes.addCategoryModal_bottom_section}>
                <button
                  className={classes.addCategoryModal_cancelButton}
                  onClick={props.handleCancel}
                >
                  Cancel
                </button>
                <button
                  className={classes.addCategoryModal_addButton}
                  onClick={handleCreateCategory}
                >
                  {isLoading ? <Loading /> : "Add"}
                </button>
              </div>
            </form>
          )}

          {/* start  Edit/Remove Category */}
          {activeTab === "tab2" && (
            <div className={classes.editCategory_card_container}>
              {category?.map((category) => (
                <div key={category?._id} className={classes.editCategory_card}>
                  <div className={classes.editCategory_card_for_each}>
                    <div className={classes.editCategory_card_image_section}>
                      <img
                        src={
                          category?.categoryImage?.url
                            ? category?.categoryImage?.url
                            : "https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                        }
                        className={classes.editCategory_card_image_section_img}
                        alt="Category"
                      />
                    </div>
                    <div className={classes.editCategory_card_details}>
                      <p className={classes.editCategory_card_details_title}>
                        Category Title
                      </p>
                      <h4 className={classes.editCategory_card_details_metrial}>
                        {category?.categoryName}
                      </h4>
                    </div>
                  </div>
                  <div className={classes.productlist_actions}>
                    <DeleteRound
                      onClick={() => handleDeleteConfirmation(category?._id)}
                    />

                    <EditRound
                      onClick={() => handleEditCategory(category?._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* end  Edit/Remove Category */}
        </div>
        <div
          className={classes.addCategoryModal_modal_closer}
          onClick={props.handleCancel}
        ></div>
      </div>

      {showToast && (
        <div className={classes.toast_container}>
          {" "}
          <ToastMessage
            handleToast={handleToast}
            icon={success}
            message="Category Added Successfully"
            background="#64ff6a"
          />
        </div>
      )}
      {updateToast && (
        <div className={classes.toast_container}>
          {" "}
          <ToastMessage
            handleToast={handleUpdateToast}
            icon={success}
            message="Category Updated Successfully"
            background="#64ff6a"
          />
        </div>
      )}
      {deleteToast && (
        <div className={classes.toast_container}>
          {" "}
          <ToastMessage
            handleToast={handleDeleteToast}
            icon={success}
            message="Category Deleted Successfully"
            background="#64ff6a"
          />
        </div>
      )}

      {deleteCategory && (
        <ConfirmationModal
          acceptClick={handleDeleteCategory}
          cancleClick={handleDeleteConfirmation}
          heading="Delete this category"
          paragraph="Are you sure you want to delete this category?"
          warningText="Deleting the category will also remove all associated items within it. This action cannot be undone."
          cancelText="Cancel"
          acceptText="Delete"
        />
      )}
      {editCategory && (
        <AddAgentModal
          isLoading={isLoading}
          confirmClick={handleUpdateCategroy}
          handleModal={handleEditCategory}
          heading="Edit Category"
          firstInputLabel="Category Title"
          imagePickerLabel="Category Image"
          confirmText="Save"
          fullName={singleCategory?.categoryName}
          image={singleCategory?.categoryImage?.url}
        />
      )}
    </>
  );
};

export default AddcategoryModal;
