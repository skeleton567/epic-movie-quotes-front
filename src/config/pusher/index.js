import Pusher from "pusher-js";
const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  channelAuthorization: {
    endpoint: "http://localhost:8000/broadcasting/auth",
    headers: { "X-CSRF-Token": "<%= form_authenticity_token %>"},
  },
}); 
Pusher.Runtime.createXHR = function () {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  return xhr;
};

export let channel = pusher.subscribe("feedbacks");
export default pusher
