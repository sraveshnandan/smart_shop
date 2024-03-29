import { GraphQLClient } from "graphql-request";
const api_endpoint = process.env.EXPO_PUBLIC_SERVER_URI_01!;
const local_api = "http://127.0.0.1:4000/";
const gql_client = new GraphQLClient(api_endpoint, {
  headers: {
    secret: process.env.EXPO_PUBLIC_SERVER_SECRET!,
  },
});

const getPercentage = (oldPrice: number, newPrice: number) => {
  const discount = oldPrice - newPrice;
  const unit = oldPrice / 100;
  const percentage = Number(discount / unit).toFixed(2);
  return percentage;
};

export { gql_client, getPercentage };
