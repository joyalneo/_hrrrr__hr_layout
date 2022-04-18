import React, { useEffect, useState } from 'react';
import Avatar from './assets/img/avatar.svg';
import Axios from 'axios';
import { shield } from 'blox-js-sdk';

const EditModal = (props) => {
  const { candidateNewModal, current, handleCandidateNewModal } = props;

  const token = shield.tokenStore.getToken();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (current) setData(current);
    else
      setData({
        firstName: '',
        lastName: '',
        emailID: '',
        phone: '',
        linkedinProfile: '',
        experience: '1 Years',
        highestEducationalQualification: 'Masters',
        preferredJobRole: 'Business Analyst',
        preferredJobLocation: 'India',
      });
  }, [current]);
  
  const onChange = (e) => {
    const { name, value } = e.target;
    let prevData = { ...data };
    prevData[name] = value;
    setData(prevData);
  };

  const onSubmit = async () => {
    try {
      if (current) {
        await Axios.post(
          `https://hiringapp-dev-functions.appblox.io/updateCandidate`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await Axios.post(
          `https://hiringapp-dev-functions.appblox.io/addCandidate`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      handleCandidateNewModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          handleConfirmModal();
        }}
        className={`fixed left-0 top-0 z-[999] h-full w-full bg-black/40 ${
          candidateNewModal ? 'fadeIn' : 'hidden'
        }`}
      ></div>
      <div
        className={`transition-max-width absolute top-8 sm:top-1/2 left-1/2 z-[1000] w-full max-w-[520px] -translate-x-1/2 sm:-translate-y-1/2 transform px-4 duration-200 ${
          candidateNewModal ? '' : 'hidden'
        }`}
      >
        <div className='relative float-left w-full rounded-md bg-white py-4 px-6'>
          <div className='float-left mb-5 w-full text-gray-dark text-xl font-bold'>
            Add New Candidate
          </div>
          <div className='w-full float-left'>
            <div className='flex w-full items-center mt-2'>
              <div className='flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200'>
                <img className='max-w-full' src={Avatar} alt=''></img>
              </div>
              <div className='flex-grow pl-2.5 pr-2 text-black truncate'>
                <label className='text-sm font-bold cursor-pointer hover:underline'>
                  <input className='hidden' type='file' />
                  Upload Profile Picture
                </label>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full float-left sm:space-x-5'>
              <div className='w-full float-left mt-4 sm:mt-5'>
                <label className='w-full float-left text-sm font-bold text-black mb-1'>
                  First Name
                </label>
                <input
                  name='firstName'
                  value={data?.firstName}
                  onChange={onChange}
                  className='w-full float-left h-11 px-3 text-base border-2 border-[#afb0b8] rounded-lg focus:outline-none focus:border-[#0C5DFF] disabled:bg-[#f5f5f6] disabled:text-sm disabled:font-bold'
                  type='text'
                ></input>
              </div>
              <div className='w-full float-left mt-4 sm:mt-5'>
                <label className='w-full float-left text-sm font-bold text-black mb-1'>
                  Last Name
                </label>
                <input
                  name='lastName'
                  value={data?.lastName}
                  onChange={onChange}
                  className='w-full float-left h-11 px-3 text-base border-2 border-[#afb0b8] rounded-lg focus:outline-none focus:border-[#0C5DFF] disabled:bg-[#f5f5f6] disabled:text-sm disabled:font-bold'
                  type='text'
                ></input>
              </div>
            </div>
            <div className='flex w-full float-left space-x-5'>
              <div className='w-full float-left mt-4 sm:mt-5'>
                <label className='w-full float-left text-sm font-bold text-black mb-1'>
                  Email ID
                </label>
                <input
                  name='emailID'
                  value={data?.emailID}
                  onChange={onChange}
                  className='w-full float-left h-11 px-3 text-base border-2 border-[#afb0b8] rounded-lg focus:outline-none focus:border-[#0C5DFF] disabled:bg-[#f5f5f6] disabled:text-sm disabled:font-bold'
                  type='text'
                ></input>
              </div>
            </div>
            <div className='flex w-full float-left space-x-5'>
              <div className='w-full float-left mt-4 sm:mt-5'>
                <label className='w-full float-left text-sm font-bold text-black mb-1'>
                  Phone
                </label>
                <input
                  name='phone'
                  value={data?.phone}
                  onChange={onChange}
                  className='w-full float-left h-11 px-3 text-base border-2 border-[#afb0b8] rounded-lg focus:outline-none focus:border-[#0C5DFF]'
                  type='text'
                ></input>
              </div>
            </div>
            <div className='flex w-full float-left space-x-5'>
              <div className='w-full float-left mt-4 sm:mt-5'>
                <label className='w-full float-left text-sm font-bold text-black mb-1'>
                  Linkedin Profile
                </label>
                <input
                  name='linkedinProfile'
                  value={data?.linkedinProfile}
                  onChange={onChange}
                  className='w-full float-left h-11 px-3 text-base border-2 border-[#afb0b8] rounded-lg focus:outline-none focus:border-[#0C5DFF]'
                  type='text'
                ></input>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full float-left sm:space-x-5'>
              <div className='w-full sm:w-2/5 float-left mt-4 sm:mt-5'>
                <label className='w-full float-left text-sm font-bold text-black mb-1'>
                  Experience
                </label>
                <select
                  name='experience'
                  value={data?.experience}
                  onChange={onChange}
                  className='candidate-select w-full float-left h-11 pl-3 pr-8 text-base bg-white border-2 border-[#afb0b8] rounded-lg focus:outline-none focus:border-[#0C5DFF]'
                >
                  <option className='text-sm'>1 Year</option>
                  <option className='text-sm'>2 Years</option>
                </select>
              </div>
              <div className='w-full sm:w-3/5 float-left mt-4 sm:mt-5'>
                <label className='w-full float-left text-sm font-bold text-black mb-1'>
                  Highest Educational Qualification
                </label>
                <select
                  name='highestEducationalQualification'
                  value={data?.highestEducationalQualification}
                  onChange={onChange}
                  className='candidate-select w-full float-left h-11 pl-3 pr-8 text-base bg-white border-2 border-[#afb0b8] rounded-lg focus:outline-none focus:border-[#0C5DFF]'
                >
                  <option className='text-sm'>Masters</option>
                  <option className='text-sm'>Bachelors</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full float-left sm:space-x-5'>
              <div className='w-full float-left mt-4 sm:mt-5'>
                <label className='w-full float-left text-sm font-bold text-black mb-1'>
                  Preferred Job Role
                </label>
                <select
                  name='preferredJobRole'
                  value={data?.preferredJobRole}
                  onChange={onChange}
                  className='candidate-select w-full float-left h-11 pl-3 pr-8 text-base bg-white border-2 border-[#afb0b8] rounded-lg focus:outline-none focus:border-[#0C5DFF]'
                >
                  <option className='text-sm'>Business Analyst</option>
                  <option className='text-sm'>UX Designer</option>
                </select>
              </div>
              <div className='w-full float-left mt-4 sm:mt-5'>
                <label className='w-full float-left text-sm font-bold text-black mb-1'>
                  Preferred Job Location
                </label>
                <select
                  name='preferredJobLocation'
                  value={data?.preferredJobLocation}
                  onChange={onChange}
                  className='candidate-select w-full float-left h-11 pl-3 pr-8 text-base bg-white border-2 border-[#afb0b8] rounded-lg focus:outline-none focus:border-[#0C5DFF]'
                >
                  <option className='text-sm'>India</option>
                  <option className='text-sm'>UK</option>
                </select>
              </div>
            </div>
          </div>
          <div className='float-left my-2 flex w-full items-center justify-end md-lt:flex-wrap mt-8'>
            <button
              onClick={() => {
                handleCandidateNewModal();
              }}
              type='button'
              className='flex justify-center ml-4 w-32 h-11 flex-shrink-0 items-center rounded-md border-none px-5 text-base font-semibold text-[#586069] first-of-type:ml-0 bg-[rgb(4_9_33)] bg-opacity-5 hover:bg-opacity-10 focus:outline-none'
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              type='button'
              className='flex justify-center ml-4 w-32 h-11 flex-shrink-0 items-center rounded-md bg-[#0C5DFF] px-5 text-base font-semibold text-white transition-all first-of-type:ml-0 hover:bg-[#0A4ACC] focus:outline-none'
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
