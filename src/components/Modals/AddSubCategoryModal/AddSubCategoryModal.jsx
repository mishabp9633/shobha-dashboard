import React, { useEffect, useState } from "react";
import classes from "./AddSubCategoryModal.module.css";
import EditRound from "../../common-components/RoundActionButton/EditRound";
import DeleteRound from "../../common-components/RoundActionButton/DeleteRound";
import AddAgentModal from "../AddAgentModal/AddAgentModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import success from "../../../assets/toast_success.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubCategoryApi,
  deleteSubCategoryApi,
  getSubCategoryApi,
  updateSubCategoryApi,
} from "../../../Store/productSlice";
import Loading from "../../Loading/ButtonLoading";
import ToastMessage from "../../common-components/ToastMessage/ToastMessage";

const AddSubCategoryModal = (props) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [showEditSub, setShowEditSub] = useState(false);
  const [deleteSub, setDeleteSub] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [updateToast, setUpdateToast] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);

  const [details, setDetails] = useState({
    categoryId: "",
    subCategoryName: "",
  });
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.products.category);
  const subcategorys = useSelector((state) => state.products.subCategory);
  const category = categorys?.Categories;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditsubCategory = (id, name) => {
    setSubCategoryId(id);
    setSubCategoryName(name);
    setShowEditSub(!showEditSub);
  };
  const handleDeleteSubCategory = (id) => {
    setSubCategoryId(id);
    setDeleteSub(!deleteSub);
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

  const handleCreateSubCategroy = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      createSubCategoryApi({
        category: details?.categoryId,
        subCategoryName: details?.subCategoryName,
      })
    ).then((response) => {
      if (response.payload) {
        setIsLoading(false);
        handleToast();
        (details.categoryId = ""), (details.subCategoryName = "");
      }
    });
  };

  const handlePhoneNumberKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateSubCategroy(e);
    }
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(getSubCategoryApi(categoryId));
    }
  }, [categoryId]);

  const subcategory = subcategorys?.SubCategories;

  const handleUpdateSubCategroy = (input) => {
    dispatch(
      updateSubCategoryApi({ data: input.fullName, subCatgryId: subCategoryId })
    ).then((response) => {
      if (response.payload) {
        dispatch(getSubCategoryApi(response.payload.category));
        handleUpdateToast();
        handleEditsubCategory();
      }
    });
  };

  const handleRemoveSubCategory = () => {
    dispatch(deleteSubCategoryApi(subCategoryId)).then((response) => {
      if (response.payload) {
        dispatch(getSubCategoryApi(response.payload.category));
        handleDeleteSubCategory();
        handleDeleteToast();
      }
    });
  };

  return (
    <>
      <div className={classes.addSubCategoryModal_main}>
        <div className={classes.addSubCategoryModal_card}>
          <div className={classes.addSubCategoryModal_heading_section}>
            <h1
              className={
                activeTab === "tab1"
                  ? classes.activeHeader
                  : classes.addSubCategoryModal_heading
              }
              onClick={() => handleTabChange("tab1")}
            >
              Add subcategory
            </h1>
            <h1
              className={
                activeTab === "tab2"
                  ? classes.activeHeader
                  : classes.addSubCategoryModal_heading
              }
              onClick={() => handleTabChange("tab2")}
            >
              Edit/Remove subcategory
            </h1>
          </div>
          {activeTab === "tab1" && (
            <form action="" className={classes.addSubCategoryModal_form}>
              <label
                htmlFor="Category"
                className={classes.addSubCategoryModal_label}
              >
                Category
              </label>
              <div>
                <select
                  id="categories"
                  value={details.categoryId}
                  className={classes.addSubCategoryModal_inputField}
                  onChange={(e) =>
                    setDetails({ ...details, categoryId: e.target.value })
                  }
                  onKeyDown={handlePhoneNumberKeyPress}
                >
                  <option value="">Select a category</option>
                  {category?.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <label
                htmlFor="Subcategory Title"
                className={classes.addSubCategoryModal_label}
              >
                Subcategory Title
              </label>
              <input
                type="text"
                className={classes.addSubCategoryModal_inputField}
                value={details.subCategoryName}
                onChange={(e) =>
                  setDetails({ ...details, subCategoryName: e.target.value })
                }
                onKeyDown={handlePhoneNumberKeyPress}
              />
              <div className={classes.addSubCategoryModal_bottom_section}>
                <button
                  className={classes.addSubCategoryModal_cancelButton}
                  onClick={props.handleCancel}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSubCategroy}
                  className={classes.addSubCategoryModal_addButton}
                >
                  {isLoading ? <Loading /> : "Add"}
                </button>
              </div>
            </form>
          )}
          {/* start the edit sub category */}

          {activeTab === "tab2" && (
            <>
              <form action="" className={classes.addSubCategoryModal_form}>
                <label htmlFor="" className={classes.addSubCategoryModal_label}>
                  Category
                </label>
                <div>
                  <select
                    id="categories"
                    className={classes.addSubCategoryModal_inputField}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {category?.map((category) => (
                      <option key={category?._id} value={category?._id}>
                        {category?.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
              <div className={classes.editSubCategoryModal_card_container}>
                {subcategorys.total > 0 ? (
                  <>
                    {subcategory?.map((subcategory) => (
                      <div
                        key={subcategory?._id}
                        className={classes.editSubCategoryModal_card}
                      >
                        <div className={classes.editSubCategoryModal_details}>
                          <p className={classes.editSubCategoryModal_title}>
                            Subcategory Title
                          </p>
                          <h3 className={classes.editSubCategoryModal_category}>
                            {subcategory?.subCategoryName}
                          </h3>
                        </div>
                        <div className={classes.editSubCategoryModal_buttons}>
                          <DeleteRound
                            onClick={() =>
                              handleDeleteSubCategory(subcategory?._id)
                            }
                          />
                          <EditRound
                            onClick={() =>
                              handleEditsubCategory(
                                subcategory?._id,
                                subcategory?.subCategoryName
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className={classes.noSubcategory_Container}>
                    No SubCategory
                  </div>
                )}
              </div>
            </>
          )}

          {/* end the edit sub category */}
        </div>
        <div
          className={classes.addSubCategoryModal_modal_closer}
          onClick={props.handleCancel}
        ></div>
        {showToast && (
          <div className={classes.toast_container}>
            {" "}
            <ToastMessage
              handleToast={handleToast}
              icon={success}
              message="SubCategory Added Successfully"
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
              message="SubCategory Updated Successfully"
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
              message="SubCategory Deleted Successfully"
              background="#64ff6a"
            />
          </div>
        )}
      </div>
      {showEditSub && (
        <AddAgentModal
          fullName={subCategoryName}
          confirmClick={handleUpdateSubCategroy}
          handleModal={handleEditsubCategory}
          heading="Edit Subcategory"
          firstInputLabel="Subcategory Title"
          confirmText="Save"
        />
      )}
      {deleteSub && (
        <ConfirmationModal
          acceptClick={handleRemoveSubCategory}
          cancleClick={handleDeleteSubCategory}
          heading="Delete this subcategory"
          paragraph="Are you sure you want to delete this subcategory?"
          warningText="Deleting the subcategory will also remove all associated items within it. This action cannot be undone."
          cancelText="Cancel"
          acceptText="Delete"
        />
      )}
    </>
  );
};

export default AddSubCategoryModal;
