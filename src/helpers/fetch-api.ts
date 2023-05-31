import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export const fetchAPI = async (
  path: string,
  urlParamsObject = {},
  options = {}
) => {
  try {
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true, // prettify URL
    });
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      "falló la solicitud a la API, posiblemente es un error de servidor"
    );
  }
};
