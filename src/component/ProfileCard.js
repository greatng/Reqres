import { useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import EditModal from './EditModal';
import PopupDelete from './PopupDelete';

const ProfileCard = ({ profile }) => {
  const [status, setStatus] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://reqres.in/api/users/${profile.id}`, {
        method: 'DELETE',
      });
      if (res.ok) setStatus('Success');
      else setStatus('error');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  const popupDelete = () => {
    setShowPopup(!showPopup);
  };

  const handleModal = () => {
    setShowEdit((prev) => !prev);
  };

  return (
    <>
      {showEdit && (
        <EditModal {...{ handleModal, profile, setStatus, status }} />
      )}
      {showPopup && <PopupDelete {...{ popupDelete, handleDelete, profile }} />}
      <div className="profile-card shadow">
        <div
          className="profile-avatar shadow"
          style={{
            backgroundImage: `url(${profile.avatar})`,
            backgroundPosition: 'center',
          }}
        ></div>
        {/* <p>ID: {profile.id}</p> */}
        <span>
          {profile.first_name} {profile.last_name}
        </span>
        <span>{profile.email}</span>
        <div className="interact">
          <div className="btn" onClick={handleModal}>
            <AiFillEdit />
          </div>
          <div className="btn" onClick={popupDelete}>
            <AiFillDelete />
          </div>
        </div>
        {status && (
          <div
            className={
              'status-box ' + (status === 'Success' ? 'success' : 'error')
            }
          >
            {status}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
