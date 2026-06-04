import { createContext, useState, useContext } from "react";

// buat context baru
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [likedUsers, setLikedUsers] = useState([]);

  const [followedUsers, setFollowedUsers] = useState([]);

  // fungsi toggle like
  const toggleLike = (userId) => {
    if (likedUsers.includes(userId)) {
      setLikedUsers(likedUsers.filter((id) => id !== userId));
    } else {
      setLikedUsers([...likedUsers, userId]);
    }
  };

  // fungsi toggle follow
  const toggleFollow = (userId) => {
    if (followedUsers.includes(userId)) {
      setFollowedUsers(followedUsers.filter((id) => id !== userId));
    } else {
      setFollowedUsers([...followedUsers, userId]);
    }
  };

  return (
    <AppContext.Provider
      value={{ likedUsers, followedUsers, toggleLike, toggleFollow }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
