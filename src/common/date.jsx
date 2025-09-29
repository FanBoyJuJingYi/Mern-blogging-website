let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getDay = (timestamp) => {
  let date = new Date(timestamp);

  return `${date.getDay()} ${months[date.getMonth()]}`;
}

export const getFullDate = (timestamp) => {
  let date = new Date(timestamp);

  return `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;

}