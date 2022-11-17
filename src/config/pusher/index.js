import Pusher from "pusher-js";
const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER
  });
let channel = pusher.subscribe("notificaitons");

export default channel
