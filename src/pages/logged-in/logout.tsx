const Logout: React.FC = () => {
  sessionStorage.removeItem('currentUserId');
  window.location.href = '/';
  return (
    <div className="Logout">
      <h1>Logging Out...</h1>
    </div>
  );
};

export default Logout