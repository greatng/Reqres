const PopupDelete = ({ popupDelete, handleDelete, profile }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Delete this profile ?</h2>
        <p>
          {profile.first_name} {profile.last_name}
        </p>
        <p>{profile.email}</p>
        <div style={{ textAlign: 'center' }}>
          <button className="btn-primary submit" onClick={handleDelete}>
            Confirm
          </button>
          <button className="btn-primary reject" onClick={popupDelete}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDelete;
