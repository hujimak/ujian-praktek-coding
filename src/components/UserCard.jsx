import { useAppContext } from "../context/AppContext";

const warnuAvatar = [
  "#1877f2", "#e91e8c", "#16a34a", "#9333ea",
  "#ea580c", "#0891b2", "#dc2626", "#7c3aed",
  "#059669", "#d97706",
];

const UserCard = ({ user }) => {
  const { likedUsers, followedUsers, toggleLike, toggleFollow } = useAppContext();
  const sudahDiLike = likedUsers.includes(user.id);
  const sudahDiFollow = followedUsers.includes(user.id);
  const inisial = user.name
    .split(" ")
    .map((kata) => kata[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const warnaIdx = (user.id - 1) % warnuAvatar.length;
  return (
    <div className={`user-card ${sudahDiFollow ? "card-followed" : ""}`}>
      {sudahDiFollow && (
        <div className="following-badge">✓ Following</div>
      )}
      <div
        className="user-avatar"
        style={{ backgroundColor: warnuAvatar[warnaIdx] }}
      >
        <span className="avatar-initials">{inisial}</span>
      </div>
      <div className="user-info">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-username">@{user.username}</p>
        <div className="card-divider"></div>
        <p className="user-email">📧 {user.email}</p>
        <p className="user-phone">📞 {user.phone}</p>
        <p className="user-company">🏢 {user.company.name}</p>
      </div>
      <div className="user-actions">
        
        <button
          className={`btn-like ${sudahDiLike ? "liked" : ""}`}
          onClick={() => toggleLike(user.id)}
        >
          {sudahDiLike ? "❤️ Liked" : "🤍 Like"}
        </button>

        <button
          className={`btn-follow ${sudahDiFollow ? "followed" : ""}`}
          onClick={() => toggleFollow(user.id)}
        >
          {sudahDiFollow ? "✓ Following" : "+ Follow"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
