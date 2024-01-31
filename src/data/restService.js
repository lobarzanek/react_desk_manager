import axios from "axios";
const API_URL = "http://localhost:8000/";
const USER_ID = 1;

export async function GetBasicFloorInfo() {
  try {
    const response = await axios.get(`${API_URL}floors`);
    return response;
  } catch {
    return;
  }
}

export async function GetBasicRoomInfoByFloorId(id) {
  try {
    const response = await axios.get(`${API_URL}rooms?floorId=${id}`);
    return response;
  } catch {
    return;
  }
}

export async function GetBasicDeskInfoByRoomId(id) {
  try {
    const response = await axios.get(`${API_URL}desks?roomId=${id}`);
    return response;
  } catch {
    return;
  }
}

export async function GetRoomMap(id, date) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const response = await axios.get(`${API_URL}rooms?id=${id}`);
    return response;
  } catch {}
}

export async function GetUserHistory() {
  try {
    const response = await axios.get(`${API_URL}history`);
    return response;
  } catch {
    return;
  }
}

export async function SendDeskReservation(date, desk) {
  //timespan for show toast pending state
  await new Promise((resolve) => setTimeout(resolve, 800));

  return
}

export async function SendIssue(desk, description) {
  //timespan for show toast pending state
  await new Promise((resolve) => setTimeout(resolve, 800));

  const issue = {
    description: description,
    status: 1,
    deskId: parseInt(desk),
    reporterId: USER_ID,
  };

  try {
    const response = await axios.post(`${API_URL}issue`, issue, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 201) {
      return Promise.reject("");
    }
    return response;
  } catch {
    return Promise.reject("");
  }
}

export async function DeleteDeskReservation(desk) {
  //timespan for show toast pending state
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const response = await axios.delete(`${API_URL}history/${desk}`);
    if (response.status !== 200) {
      return Promise.reject("");
    }
    return response;
  } catch (error) {
    return Promise.reject("");
  }
}
