import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserId } from '../../../store/userReducer';
import Header from '../../header/Header';
import './onboarding.scss';

function Onboarding() {

  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const [formData, setFormData] = useState({
    user_id: userId,
    name:'',
    dob_day:'',
    dob_month:'',
    dob_year:'',
    gender:'man',
    email:'',
    about:'',
    photo:'',
  });
  useEffect(() => {
    const getCurrentUser = async () => {
       const response = await axios.get("http://localhost:8000/user", { params: {userId},})
       const user = response.data;
       if(user && user.gender != null) {
         console.log(user);
         setFormData({
            user_id: user.user_id,
            name: user.name,
            dob_day: user.dob_day,
            dob_month: user.dob_month,
            dob_year: user.dob_year,
            gender: user.gender,
            email: user.mail,
            about: user.about,
            photo: user.photo,
         });
       } 
    }
    getCurrentUser();
  },[userId]);
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name; 
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {formData});
      const success = response.status === 200;
      console.log(response.data);
      if(success) {
        navigate('/home');
      };
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Header showNav={false} authToken={false}/>
     
      <div className="onboarding">
          <h2 className="title-form">CREATE ACCOUNT</h2>
          <form onSubmit={handleSubmit}>
              <section>
                
                  <label htmlFor="name">Your name</label>
                  <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required={true}
                      value={formData.name}
                      onChange={handleChange}
                  />

                  <label>Birthday</label>
                  <div className="info-container">
                    <input
                        id="dob_day"
                        type="number"
                        name="dob_day"
                        placeholder="DD"
                        required={true}
                        value={formData.dob_day}
                        onChange={handleChange}
                    />
                    <input
                        id="dob_month"
                        type="number"
                        name="dob_month"
                        placeholder="MM"
                        required={true}
                        value={formData.dob_month}
                        onChange={handleChange}
                    />
                    <input
                        id="dob_year"
                        type="number"
                        name="dob_year"
                        placeholder="YYYY"
                        required={true}
                        value={formData.dob_year}
                        onChange={handleChange}
                    />
                  </div>

                  <label>Gender</label>
                  <div className="info-container">
                    <input
                        id="man-gender"
                        type="radio"
                        name="gender"
                        value="man"
                        onChange={handleChange}
                        checked={formData.gender === 'man'}
                    />
                    <label htmlFor="man-gender">Man</label>

                    <input
                      id="woman-gender"
                      type="radio"
                      name="gender"
                      required={true}
                      value="woman"
                      onChange={handleChange}
                      checked={formData.gender === 'woman'}
                    />
                    <label htmlFor="woman-gender">Woman</label>
                  </div>

                    <label htmlFor="about">About me</label>
                    <input
                      id="about"
                      type="text"
                      name="about"
                      required={true}
                      placeholder="I like long walks..."
                      value={formData.about}
                      onChange={handleChange}
                    />
                    <input type="submit" />
              </section>

              
              <section>
                <label htmlFor="photo">Image Profile</label>
                <input
                    type="url"
                    name="photo"
                    id="photo"
                    onChange={handleChange}
                    value={formData.photo}
                    required={true}
                />
                <div className="photo-container">
                  { formData.photo && <img src={formData.photo} alt="img profile"/>}
                </div>
              </section>

          </form>

      </div>
       <div className="overlay"></div>
      <div className="background"></div>
    </div>
  )
}

export default Onboarding