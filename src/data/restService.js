import axios from "axios";
const API_URL = "https://localhost:7115/api/";
const USER_ID = 1;

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

export async function GetUserHistory() {
  try {
    const response = await axios.get(`${API_URL}Reservation/user/${USER_ID}`);
    return response;
  } catch {
    return;
  }
}

export async function SendDeskReservation(date, desk) {
  //timespan for show toast pending state
  await new Promise((resolve) => setTimeout(resolve, 800));

  const reservation = {
    date: `${date}T00:00:00.000Z`,
    userId: USER_ID,
    deskId: desk,
  };
  try {
    const response = await axios.post(`${API_URL}Reservation`, reservation, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch {
    return;
  }
}

export async function SendIssue(desk, description) {
  //timespan for show toast pending state
  await new Promise((resolve) => setTimeout(resolve, 800));

  const reservation = {
    reporterId: USER_ID,
    deskId: desk,
    description: description,
    status: 1,
  };
  try {
    const response = await axios.post(`${API_URL}Reservation`, reservation, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch {
    return;
  }
}
