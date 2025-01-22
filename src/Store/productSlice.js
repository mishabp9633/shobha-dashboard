import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./AxiosMethod";

// Add product api
export const addProductApi = createAsyncThunk(
  "products/addProductApi",
  async (input) => {
    const respond = await axiosApi.post("/collection/admin/new", input);
    const productId = respond.data._id;
    console.log(respond.data);
    await axiosApi
      .post(`/image/admin/new?collectionId=${productId}`, {
        images: input.images,
      })
      .then((response) => console.log(response.data));
    return respond.data;
  }
);

// Product Get Api
export const productGetApi = createAsyncThunk(
  "products/productGetApi",
  async () => {
    const respond = await axiosApi.get("/collection/admin/all");
    return respond.data;
  }
);

// Single Product Get Api
export const singleProductGetApi = createAsyncThunk(
  "products/singleProductGetApi",
  async (productId) => {
    const respond = await axiosApi.get(`/collection/admin/${productId}`);
    return respond.data;
  }
);

export const productDeleteApi = createAsyncThunk(
  "products/productDeleteApi",
  async (productId) => {
    const respond = await axiosApi.delete(`/collection/admin/${productId}`);
    console.log(respond.data);
    return respond.data;
  }
);

// Category add Api
export const createCategoryApi = createAsyncThunk(
  "products/createCategoryApi",
  async (input) => {
    const respond = await axiosApi.post("/category/admin/new", {
      categoryName: input.categoryName,
    });
    const categoryId = respond.data._id;
    await axiosApi.post(`/image/admin/new?categoryId=${categoryId}`, {
      images: input.image,
    });

    return respond.data;
  }
);

// Category update api
export const updateCategoryApi = createAsyncThunk(
  "products/updateCategoryApi",
  async (input) => {
    const respond = await axiosApi.put(`/category/admin/${input.id}`, {
      categoryName: input.categoryName,
    });
    await axiosApi.post(`/image/admin/new?categoryId=${input.id}`, {
      images: input.image,
    });
    return respond.data;
  }
);

// Category get api
export const categoryGetApi = createAsyncThunk(
  "products/categorygetApi",
  async () => {
    const respond = await axiosApi.get("/category/admin/all");
    return respond.data;
  }
);

// Single Category get api
export const singleCategoryApi = createAsyncThunk(
  "products/singleCategoryApi",
  async (id) => {
    const respond = await axiosApi.get(`/category/admin/${id}`);
    return respond.data;
  }
);

// Category delete api
export const categoryDeleteApi = createAsyncThunk(
  "products/categoryDeleteApi",
  async (categoryId) => {
    const respond = await axiosApi.delete(`/category/admin/${categoryId}`);
    console.log(respond.data);
    return respond.data;
  }
);

// SubCategory add Api
export const createSubCategoryApi = createAsyncThunk(
  "products/createSubCategoryApi",
  async (data) => {
    const respond = await axiosApi.post("/subcategory/admin/new", data);

    return respond.data;
  }
);

// SubCategory get Api
export const getSubCategoryApi = createAsyncThunk(
  "products/getSubCategoryApi",
  async (catgryId) => {
    const respond = await axiosApi.get(
      `/subcategory/admin/all/?category=${catgryId}`
    );

    return respond.data;
  }
);

// SubCategory edit Api
export const updateSubCategoryApi = createAsyncThunk(
  "products/updateSubCategoryApi",
  async (input) => {
    const respond = await axiosApi.put(
      `/subcategory/admin/${input.subCatgryId}`,
      { subCategoryName: input.data }
    );
    return respond.data;
  }
);

// SubCategory delete Api
export const deleteSubCategoryApi = createAsyncThunk(
  "products/deleteSubCategoryApi",
  async (subCatgryId) => {
    const respond = await axiosApi.delete(`/subcategory/admin/${subCatgryId}`);
    console.log(respond.data);
    return respond.data;
  }
);

const initialState = {
  allProducts: {},
  singleProduct: {},
  categoryId: "",
  category: {},
  subCategory: {},
  singleCategory: {},
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productGetApi.fulfilled]: (state, action) => {
      state.allProducts = action.payload;
    },
    [singleProductGetApi.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;
    },
    [createCategoryApi.fulfilled]: (state, action) => {
      state.categoryId = action.payload._id;
    },
    [categoryGetApi.fulfilled]: (state, action) => {
      state.category = action.payload;
    },
    [getSubCategoryApi.fulfilled]: (state, action) => {
      state.subCategory = action.payload;
    },
    [singleCategoryApi.fulfilled]: (state, action) => {
      state.singleCategory = action.payload;
    },
  },
});

export default productSlice.reducer;
