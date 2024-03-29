import AsyncStorage from "@react-native-async-storage/async-storage";
import { gql } from "graphql-request";
import { gql_client } from "..";
import { ICategories, Ishop } from "@/types";

const fetchAllShops = async (
  next: (category?: ICategories[], shops?: Ishop[]) => void
) => {
  const query = gql`
    query GetAllShops {
      shops {
        _id
        name
        description
        owner {
          _id
          name
          email
          avatar {
            url
          }
        }
        followers {
          __typename
        }
        images {
          public_id
          url
        }
        address
        products {
          _id
          title
          category {
            _id
          }
        }
        createdAt
      }
      category {
        _id
        name
        createdBy {
          _id
          name
          avatar {
            url
          }
        }
      }
    }
  `;
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    return;
  }
  try {
    const res: any = await gql_client.setHeader("token", token).request(query);
    if (res.category || res.shops) {
      return res;
    } else return new Error(res);
  } catch (error: any) {
    return new Error(error.message);
  }
};

const fetchAllProducts = async (next: (products: any) => void) => {
  const query = gql`
    query GetAllProductFunction {
      products {
        _id
        title
        description
        images {
          public_id
          url
        }
        original_price
        discount_price
        category {
          _id
          name
        }
        owner {
          _id
          name
          address
          owner {
            _id
            avatar{
              url
            }
          }
        }
        views
        ratings
        extra {
          name
          value
        }
      }
    }
  `;
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    return;
  }
  try {
    const res: any = await gql_client.setHeader("token", token).request(query);
    // console.log("Products data fetched successfully.\n", res.shops);
    return next(res.products);
  } catch (error: any) {
    return new Error(error.message);
  }
};

const fetchedUserProfile = async (next: (profile: any) => void) => {
  const query = gql`
    query ProfileFunction {
      profile {
        message
        user {
          _id
          name
          email
          isShopOwner
          isAdmin
          phone_no
          avatar {
            public_id
            url
          }
          shops {
            _id
            name
          }
        }
      }
    }
  `;
  const token = await AsyncStorage.getItem("token");
  if (!token || token === null) {
    return next("");
  }
  try {
    const res: any = await gql_client.setHeader("token", token).request(query);
    return next(res.profile);
  } catch (error: any) {
    return next("");
  }
};

const updateShop: (
  name: string,
  description: string,
  address: string,
  id: string
) => void = async (
  name: string,
  description: string,
  address: string,
  id: string
) => {
  try {
    let data = { id, name, description, address };
    console.log("data", data);
    let query = gql`
      mutation UpdateShopFunction($shopData: ShopInput) {
        updateShop(data: $shopData) {
          message
        }
      }
    `;

    const variables = {
      shopData: {
        id,
        name,
        description,
        address,
      },
    };

    const res: any = await gql_client.request(query, variables);

    console.log("responce", res.updateShop);

    return res.updateShop.message;
  } catch (error) {}
};

const updateUserprofile = async () => {
  try {
  } catch (error) {}
};

// Upload image function

const uploadImage = async (uri: string) => {
  const formData = new FormData();
  formData.append("file", {
    uri,
    name: `${uri.split("/")[1]}`,
    type: "image/jpg",
  } as any);
  formData.append("upload_preset", "secret_app");

  try {
    const cloudinaryParams = "w_500,h_500,c_fill";
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dirdehr7r/image/upload${cloudinaryParams}`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = await response.json();
    console.log("details", { public_id: data.public_id, url: data.url });
    console.log("Upload Action completed.");
    // handle response accordingly
    return data;
  } catch (error: any) {
    console.error("Error uploading image: ", error);
    return error.message;
  }
};
export {
  fetchAllProducts,
  fetchedUserProfile,
  fetchAllShops,
  updateShop,
  uploadImage,
};
