'use client';
import React, { ChangeEvent, useState } from 'react';
import { preview } from 'assets';
import { getRandomPrompt } from '../[utils]';
import { FormField } from 'app/[components]';
import Loader from 'app/loading';
import { useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';

function page() {
  const navigation = useRouter();
  const [form, setForm] = useState({ name: '', prompt: '', photo: '' });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('api/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // if (form.prompt && form.photo) {
    setloading(true);
    try {
      const response = await fetch('api/postRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      console.log(form);
      if (response.ok) {
        await response.json();
        navigation.push('/');
      }
    } catch (error) {
      alert(error);
      console.error(error);
    } finally {
      setloading(false);
    }
    // } else {
    //   alert('Please enter a prompt and generate an image');
    // }
  };

  const handleChange = (e: ChangeEvent) => {
    //  e.preventDefault();
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target!.name]: target!.value });
  };
  const handleSupriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-[32px] font-extrabold text-[#222328]">Create</h1>
        <p className="mt-2 max-w-[500px] text-[14px] text-[#666e75]">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelname="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
            isSupriseMe={false}
            handleSupriseMe={() => {}}
          />
          <FormField
            labelname="Prompt"
            type="text"
            name="prompt"
            placeholder="a painting of a fox in the style of Starry Night"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
          />
          <div className="relative flex h-64 w-64 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
            {form.photo ? (
              <>
                <img
                  onClick={handleOpen}
                  src={form.photo}
                  alt={form.prompt}
                  className="h-full w-full object-contain"
                />
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="absolute bottom-1/2  right-1/2 max-h-[90vh] max-w-[90vw] translate-x-1/2 translate-y-1/2 object-contain"
                  />
                </Modal>
              </>
            ) : (
              <img src={preview.src} alt="preview" />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="w-full rounded-md bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[14px] text-[#666e75]">
            Once you have created the image you want, you can share it with
            others in the community
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-3 w-full rounded-md bg-[#6469ff] px-5 py-5 text-center text-sm font-medium text-white sm:w-auto"
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default page;
