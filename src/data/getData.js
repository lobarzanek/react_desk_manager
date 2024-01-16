import axios from "axios";
const API_URL = "https://localhost:7115/api/";

export async function GetBasicFloorInfo() {
  try {
    const response = await axios.get(`${API_URL}Floor/basic`);
    return response;
  } catch {
    return;
  }
}

export async function GetBasicRoomInfoByFloorId(id) {
  try {
    const response = await axios.get(`${API_URL}Room/basic/floor/${id}`);
    return response;
  } catch {
    return;
  }
}

export async function GetBasicDeskInfoByRoomId(id) {
  try {
    const response = await axios.get(`${API_URL}Desk/free/room/${id}`);
    return response;
  } catch {
    return;
  }
}

export async function GetRoomMap(id, date) {
  try {
    const response = await axios.get(
      `${API_URL}Room/map/${id}?date=${date}T00%3A00%3A00.000Z`
    );
    return response;
  } catch {
    return;
  }
}
