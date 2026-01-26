// export const formatMyDate = date => {
//     let options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     };
//     const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
//     return formattedDate;
//   }
export const formatMyDate = (date) => {
  if (!date) return ""; // ✅ guard null / undefined

  const d = new Date(date); // ✅ convert string → Date

  if (isNaN(d.getTime())) return ""; // ✅ invalid date guard

  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(d);
};



  export const formatDuration = (duration) => {
    if (!duration) return null;

    var hour = Math.floor(duration / 3600);
    var min = Math.floor(duration % 3600 / 60);
    var sec = Math.floor(duration % 3600 % 60);

    const durationString = `${hour}:${min}:${sec}`;

    console.log(durationString);

    return durationString;
  }