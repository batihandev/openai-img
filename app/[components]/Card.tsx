import React from 'react';
import { download } from 'assets';
import { downloadImage } from 'app/[utils]';
import Modal from '@mui/material/Modal';
interface props {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}
function Card({ _id, name, prompt, photo }: props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="shadow-card hover:shadow-cardhover card group relative rounded-xl">
      <img
        src={photo}
        alt={prompt}
        onClick={handleOpen}
        className="h-auto w-full rounded-xl object-cover"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <img
          src={photo}
          alt={prompt}
          className="absolute bottom-1/2  right-1/2 max-h-[90vh] max-w-[90vw] translate-x-1/2 translate-y-1/2 object-contain"
        />
      </Modal>
      <div className="absolute bottom-0 left-0 right-0 m-2 hidden max-h-[94.5%] flex-col rounded-md bg-[#10131f] p-4 group-hover:flex">
        <p className="text-md overflow-y-auto text-white">{prompt}</p>
        <div className="mt-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 object-cover
      text-xs font-bold text-white"
            >
              {name[0]}
            </div>
            <p className="text-sm text-white">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="border-none bg-transparent outline-none"
          >
            <img
              src={download.src}
              alt="download"
              className="h-6 w-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
