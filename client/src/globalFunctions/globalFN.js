import * as Api from "../Api/apiCalls";

export function getRequest(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.get(GlobalURL + url);
      resolve(res);
    } catch (err) {
      resolve("Error : ", err);
    }
  });
}
