export function formatNumber(number: any): any {
  if (!number) {
    return number;
  }
  const n = number.toLocaleString("fullwide", {
    useGrouping: false,
    maximumSignificantDigits: 20,
  });
  if (n.search(".") < 0) {
    return number;
  }
  const split = n.split(".");
  if (+split[0] > 0) {
    return Math.round(number * 10 ** 4) / 10 ** 4;
  }
  let digit = 6;
  for (let i = 0; i < split[1]?.length; i++) {
    if (split[1][i] == "0") {
      digit++;
    } else {
      break;
    }
  }
  return (Math.round(number * 10 ** digit) / 10 ** digit).toLocaleString(
    "fullwide",
    {
      useGrouping: false,
      maximumSignificantDigits: 20,
    }
  );
}

export const setCookie = (cname: any, cvalue: any, exdays: any) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const getCookie = (cname: any) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
