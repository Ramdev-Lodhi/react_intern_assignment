/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { TableData } from "../types/TableTypes";

export const getAPI_Data = async (page: number) => {
  try {
    const response = await axios.get(
      `https://api.artic.edu/api/v1/artworks?page=${page}`
    );
    const { data, pagination } = response.data;

    const tableData: TableData[] = data.map((item: any) => ({
      id: item.id,
      title: item.title,
      place_of_origin: item.place_of_origin || "No place of origin",
      artist_display: item.artist_display || "NO artist display",
      inscriptions: item.inscriptions || "No inscriptions",
      date_start: item.date_start || "No date start",
      date_end: item.date_end || "No date end",
    }));

    return {
      tableData,
      totalRecords: pagination.total,
      limit: pagination.limit,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
