const EditModal = ({ handleModal, profile, setStatus }) => {
  const patchEdit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    try {
      const res = await fetch(`https://reqres.in/api/users/${profile.id}`, {
        method: 'PATCH',
        body: formData,
      });
      if (res.ok) setStatus('Success');
      else setStatus('Error');
    } catch (err) {
      console.error(err);
      setStatus('Error');
    }
    setTimeout(() => setStatus(null), 5000);
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={(e) => patchEdit(e)}>
          <label for="fname">First Name</label>
          <input
            id="fname"
            type="text"
            name="first_name"
            placeholder="First Name"
            defaultValue={profile.first_name}
          />
          <label for="lname">Last Name</label>
          <input
            id="lname"
            type="text"
            name="last_name"
            placeholder="Last Name"
            defaultValue={profile.last_name}
          />
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={profile.email}
          />
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn-primary submit">
              Submit
            </button>
            <button className="btn-primary reject" onClick={handleModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
