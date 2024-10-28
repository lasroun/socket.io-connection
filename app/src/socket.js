import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
});

const URL = import.meta.env.API || "http://localhost:8000";

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});
