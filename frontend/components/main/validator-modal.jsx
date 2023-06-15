
import React, { useState, useEffect } from 'react';
import { Button, Modal  } from 'flowbite-react';
import { BsWindow, BsGithub, BsTwitter } from 'react-icons/bs';

export const ValidatorModal = ({ validator }) => {
    const [openModal, setOpenModal] = useState('');
    const props = { openModal, setOpenModal };
  return (
    <>
    <div className="dark">
      <Button size="sm" color="gray" className="text-xs" onClick={() => props.setOpenModal('dismissible')}>About the Validator</Button>
      <Modal className="dark" dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>{validator.description.moniker}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
            {validator.description.details}
            </p>
            <div className="flex justify-between items-center mt-4">
            <div>
                <h4 className="text-gray-200 text-sm">Rating</h4>
                <span className="mt-2 text-xl font-medium text-gray-300">127274</span>
            </div>
            <div>
                <h4 className="text-gray-200 text-sm">Submissions</h4>
                <span className="mt-2 text-xl font-medium text-gray-300">12171</span>
            </div>
            <div>
                <h4 className="text-gray-200 text-sm">Reviews</h4>
                <span className="mt-2 text-xl font-medium text-gray-300">35</span>
            </div>
        </div>
      
        <div className="mt-4">
            <h4 className="text-sm text-gray-400">Achievements</h4>
            <div className="flex items-center overflow-hidden mt-2">
                <img className="inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" />
            </div>
        </div>
        <div className="mt-4">
            <h4 className="text-sm text-gray-400">250 Followers</h4>
            <div className="flex items-center overflow-hidden mt-2">
                <img className="inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
                <img className="-ml-2 inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" />
            </div>
        </div>
          </div>
          
        </Modal.Body>
        
        <Modal.Footer>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
        
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <BsWindow/>
            <BsTwitter/>
            <BsGithub/>
          </div>
        </div>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  )
}

export default ValidatorModal;