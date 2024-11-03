import { message } from "antd";

let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmail = email => emailRegex.test(email)
window.randomId = () => Math.random().toString(36).slice(2)
 const toastify = (msg = "", type) => {
  switch (type) {
      case "success": message.success(msg); break;
      case "error": message.error(msg); break;
      case "info": message.info(msg); break;
      case "warning": message.warning(msg); break;
      default: message.info(msg);
  }
}
 window.toastifys = (msg = "", type) => {
  switch (type) {
      case "success": message.success(msg); break;
      case "error": message.error(msg); break;
      case "info": message.info(msg); break;
      case "warning": message.warning(msg); break;
      default: message.info(msg);
  }
}
export { isEmail, toastify };