import React from "react";

function FormSection({ data, setData }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setData({ ...data, image: reader.result }); // Base64 string
    };
    reader.readAsDataURL(file);
  }
};


  return (
    <div className="form-section">
      <h2>Profile Details</h2>

      <label>Profile Image</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <label>Name</label>
      <input name="name" value={data.name} onChange={handleChange} />

      <label>Bio</label>
      <textarea name="bio" value={data.bio} onChange={handleChange} />

      <label>Phone</label>
      <input name="phone" value={data.phone} onChange={handleChange} />

      <label>Email</label>
      <input name="email" value={data.email} onChange={handleChange} />

      <label>LinkedIn</label>
      <input name="linkedin" value={data.linkedin} onChange={handleChange} />

      <label>GitHub</label>
      <input name="github" value={data.github} onChange={handleChange} />

      <h3>Education</h3>
      <label>10th Grade</label>
      <input name="tenth" value={data.tenth} onChange={handleChange} />

      <label>12th Grade</label>
      <input name="twelfth" value={data.twelfth} onChange={handleChange} />

      <label>Graduation</label>
      <input name="graduation" value={data.graduation} onChange={handleChange} />

      <label>Post Graduation (if any)</label>
      <input
        name="postgraduation"
        value={data.postgraduation}
        onChange={handleChange}
      />

      <h3>Skills</h3>
      <textarea name="skills" value={data.skills} onChange={handleChange} />

      <h3>Experience</h3>
      <textarea
        name="experience"
        value={data.experience}
        onChange={handleChange}
      />
    </div>
  );
}

export default FormSection;
