import React, { useEffect, useState } from "react";
import classes from "./ProductList.module.css";
import productList from "../../assets/productList.svg";
import PageDetail from "../../components/common-components/PageDetail/PageDetail";
import SearchInput from "../../components/common-components/SearchInput/SearchInput";
import AddButton from "../../components/common-components/AddButton/AddButton";
import prodSubCategoryIcon from "../../assets/prodsubcategoryicon.svg";
import prodCategoryIcon from "../../assets/prodcategoryicon.svg";
import AddcategoryModal from "../../components/Modals/AddCategoryModal/AddcategoryModel";
import AddSubCategoryModal from "../../components/Modals/AddSubCategoryModal/AddSubCategoryModal";
import AddProduct from "../../components/Modals/AddProducts/AddProduct";
import ConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductApi,
  categoryGetApi,
  productDeleteApi,
  productGetApi,
  singleProductGetApi,
} from "../../Store/productSlice";

const ProductList = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [singleProductModal, setSingleProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const singleProduct = useSelector((state) => state.products.singleProduct);

  const handleSingleProductModal = async (id) => {
    await dispatch(singleProductGetApi(id));
    setSingleProductModal(!singleProductModal);
  };
  const handleAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  };
  const handleSubCategory = () => {
    setShowSubCategory(!showSubCategory);
  };
  const handleAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  };

  const handleDeleteConfirmation = () => {
    setDeleteConfirmation(!deleteConfirmation);
  };

  useEffect(() => {
    dispatch(productGetApi());
    dispatch(categoryGetApi());
  }, []);

  const collections = allProducts?.Collections;

  const handleCreateProduct = (input) => {
    setIsLoading(true);
    dispatch(addProductApi(input))
      .then((response) => {
        if (response.payload) {
          toast.success("Product Created Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(productGetApi());
          handleAddProduct();
        } else {
          toast.error("Image Not Uploaded", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handleAddProduct();
          dispatch(productGetApi());
        }
      })
      .catch((error) => {
        handleAddProduct();
        dispatch(productGetApi());
        toast.error("Image Not Uploaded", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteProduct = () => {
    dispatch(productDeleteApi(singleProduct?._id)).then((response) => {
      if (response.payload) {
        toast.success("Product Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(productGetApi());
        handleDeleteConfirmation();
        setSingleProductModal(!singleProductModal);
      }
    });
  };

  const dimensionsString = singleProduct?.productInfo?.dimensions;

  let dimension1 = "";
  let dimension2 = "";

  if (dimensionsString) {
    const dimensionsWithoutUnit = dimensionsString.replace(/mm/g, "");
    const dimensionsArray = dimensionsWithoutUnit.split("x");

    if (dimensionsArray.length === 2) {
      dimension1 = dimensionsArray[0].trim();
      dimension2 = dimensionsArray[1].trim();
    }
  }

  console.log(singleProduct);

  return (
    <>
      <div className={classes.productlist_container}>
        <PageDetail
          image={productList}
          heading="Product List"
          count={allProducts?.total}
        />
        <div className={classes.productlist_search_section}>
          <SearchInput />
          <div className={classes.prodAll_buttons}>
            <div className={classes.category_buttons}>
              <button
                className={classes.add_button}
                onClick={handleAddCategory}
              >
                <div className={classes.subcategorybtn}>
                  <img src={prodCategoryIcon} alt="Icon" />
                </div>
                Categories
              </button>
              <button
                className={classes.add_button}
                onClick={handleSubCategory}
              >
                <div className={classes.subcategorybtn}>
                  <img src={prodSubCategoryIcon} alt="Icon" />
                </div>
                Subcategories
              </button>
            </div>
            <div>
              <AddButton text="Add product" onClick={handleAddProduct} />
            </div>
          </div>
        </div>
        <div className={classes.productlist_wrapper_container}>
          {collections?.map((collection) => (
            <div
              key={collection?._id}
              className={classes.productlist_wrapper}
              onClick={() => handleSingleProductModal(collection?._id)}
            >
              <div className={classes.productlist_details}>
                <div className={classes.productlist_details_img_container}>
                  {collection?.productImage?.[0]?.url ? (
                    <img
                      src={collection?.productImage?.[0]?.url}
                      className={
                        classes.productlist_details_img_container_image
                      }
                      alt="Product Image"
                    />
                  ) : (
                    "No Image Found"
                  )}
                </div>
                <div className={classes.ProductList_text_wrapper}>
                  <div className={classes.productlist_details_item}>
                    <h3>{collection?.title}</h3>
                    <p>{collection?.subTitle}</p>
                  </div>
                  <div className={classes.productlist_details_category}>
                    <span>{collection?.categoryName}</span>
                    <div
                      className={classes.productlist_details_category_border}
                    ></div>
                    <span>{collection?.subCategoryName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ToastContainer />
      </div>
      {showAddCategory && <AddcategoryModal handleCancel={handleAddCategory} />}
      {showSubCategory && (
        <AddSubCategoryModal handleCancel={handleSubCategory} />
      )}
      {showAddProduct && (
        <AddProduct
          isLoading={isLoading}
          handleAdd={handleCreateProduct}
          handleCancel={handleAddProduct}
          heading="Add Product"
        />
      )}
      {singleProductModal && (
        <AddProduct
          // isLoading={isLoading}
          // handleAdd={handleCreateProduct}
          deleteClick={handleDeleteConfirmation}
          handleCancel={() => setSingleProductModal(!singleProductModal)}
          heading="Edit Product"
          title={singleProduct?.title}
          subTitle={singleProduct?.subTitle}
          category={singleProduct?.category?._id}
          subCategory={singleProduct?.subCategory?._id}
          metal={singleProduct?.productInfo?.metal}
          startDimension={dimension1}
          endDimension={dimension2}
          length={singleProduct?.productInfo?.length.replace(/mm$/, "")}
          weight={singleProduct?.productInfo?.weight.replace(/g$/, "")}
          image={singleProduct?.productImage}
        />
      )}
      {deleteConfirmation && (
        <ConfirmationModal
          acceptClick={handleDeleteProduct}
          cancleClick={handleDeleteConfirmation}
          heading="Delete this product"
          paragraph="Are you sure you want to delete this product?"
          cancelText="Cancel"
          acceptText="Delete"
        />
      )}
    </>
  );
};

export default ProductList;
