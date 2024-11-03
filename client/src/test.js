// import "./App.css";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import {StreamChat} from "stream-chat";
// import {Chat} from "stream-chat-react";
// import Cookies from "universal-cookie";
// import {useState, useEffect} from "react";
// import JoinGame from "./components/JoinGame";
// import axios from "axios";
//
// function App() {
//     const api_key = "842k9artxzb2";
//     const cookies = new Cookies();
//     const streamToken = cookies.get("token"); // Stream token
//     const streamClient = StreamChat.getInstance(api_key);
//     const [isAuth, setIsAuth] = useState(false);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [cognitoToken, setCognitoToken] = useState(""); // Store Cognito token here
//
//     const logOut = () => {
//         cookies.remove("streamToken");
//         cookies.remove("userId");
//         cookies.remove("username");
//         cookies.remove("email");
//         streamClient.disconnectUser();
//         setIsAuth(false);
//         // cookies.remove("token");
//         // cookies.remove("userId");
//         // cookies.remove("password");
//         // cookies.remove("channelName");
//         // cookies.remove("email");
//         // cookies.remove("username");
//         // client.disconnectUser();
//         // setIsAuth(false);
//     };
//
//     useEffect(() => {
//         const queryParams = new URLSearchParams(window.location.search);
//         const code = queryParams.get("code");
//
//         if (code) {
//             const clientID = process.env.REACT_APP_COGNITO_CLIENT_ID || "";
//             const clientSecret = process.env.REACT_APP_COGNITO_CLIENT_SECRET || "";
//             const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN || "";
//             const credentials = `${clientID}:${clientSecret}`;
//             const base64Credentials = btoa(credentials);
//             const basicAuthorization = `Basic ${base64Credentials}`;
//             const headers = {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 Authorization: basicAuthorization,
//             };
//
//             const data = new URLSearchParams();
//             data.append("grant_type", "authorization_code");
//             data.append("client_id", clientID);
//             data.append("code", code);
//             data.append("redirect_uri", "http://localhost:3000");
//
//             axios
//                 .post(`${cognitoDomain}/oauth2/token`, data, {headers})
//                 .then((res) => {
//                     if (res.status !== 200) return;
//                     const token = res?.data?.access_token;
//                     setCognitoToken(token); // Set the Cognito token
//
//                     const userInfoHeaders = {
//                         Authorization: "Bearer " + token,
//                     };
//                     console.log("Token Response:", res.data);
//
//                     return axios.get(`${cognitoDomain}/oauth2/userInfo`, {headers: userInfoHeaders});
//                 })
//                 .then((userInfo) => {
//                     if (userInfo && userInfo.status === 200) {
//                         setName(userInfo.data?.username);
//                         setEmail(userInfo.data?.email);
//                         cookies.set("userId", userInfo.data?.sub);
//                         cookies.set("username", userInfo.data?.username);
//                         cookies.set("email", userInfo.data?.email);
//                         const userId = userInfo.data.sub;
//                         // const streamToken = streamClient.createToken(userId); // Create Stream token
//
//                         // Save tokens to cookies
//                         cookies.set("streamToken", streamToken);
//                         console.log("testikik:" + streamToken);
//                         setIsAuth(true); // Set authenticated state
//                         return streamClient.connectUser(
//                             {id: userId, name: userInfo.data.username},
//                             streamToken
//                         );
//                     }
//                 })
//                 .catch((err) => console.error("Error fetching user info:", err));
//         }
//     }, []);
//
//
//     console.log("stream: " + streamToken);
//     return (
//         <div className="App">
//             {isAuth ? (
//                 <Chat client={streamClient}>
//                     <JoinGame/>
//                     <button onClick={logOut}> Log Out</button>
//                 </Chat>
//             ) : (
//                 <>
//                     <SignUp setIsAuth={setIsAuth}/>
//                     <Login setIsAuth={setIsAuth}/>
//                 </>
//             )}
//         </div>
//     );
// }
//
// export default App;