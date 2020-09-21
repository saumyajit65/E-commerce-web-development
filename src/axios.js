//axios is a fetching library and to get details
import axios from "axios";

const instance = axios.create({
  //here we dont have any client function or URL so
  //axios helps in easy implementation of baseURL
  // baseURL: "http://localhost:5001/clone-115a8/us-central1/api", //this is the API URL for local operation and you do all with this... this i got from firebase emulators
  baseURL: "https://us-central1-clone-115a8.cloudfunctions.net/api", // this at the very end u will get the link after functions deploy
});
export default instance;

//
