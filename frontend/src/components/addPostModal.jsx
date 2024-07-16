import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Button } from '@nextui-org/react';
import { addNewPost, getAllPosts } from '../services/postServices';

const AddPostModal = ({ isOpen, onOpenChange, fetchPosts }) => {
  const [postInfo, setPostInfo] = useState({
    image: '',
    title: '',
    description: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({
    title: false,
    description: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostInfo({ ...postInfo, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostInfo({ ...postInfo, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = async () => {
    const { title, description } = postInfo;

    if (!title.trim() || !description.trim()) {
      setErrors({
        title: !title.trim(),
        description: !description.trim()
      });
      return;
    }

    const post = { ...postInfo, id_admin: localStorage.getItem('id_admin') };
    try {
      await addNewPost(post.id_admin, post.title, post.description, post.image);
      await fetchPosts();
      setPostInfo({ image: '', title: '', description: '' });
      setImagePreview(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add new post:', error);
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        }
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add New Post</ModalHeader>
            <ModalBody>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="fileInput"
                    style={{ display: 'none' }}
                  />
                  <div
                    onClick={() => document.getElementById('fileInput').click()}
                    className="w-full h-44 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Image Preview" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-gray-400">Upload Image</span>
                    )}
                  </div>
                </div>
                <Input
                  label="Title"
                  placeholder="Enter title"
                  name="title"
                  value={postInfo.title}
                  onChange={handleInputChange}
                  error={errors.title && 'Title is required'}
                />
                {errors.title && <span className="mt-2 text-sm text-rose-600">Title is required</span>}
                <Textarea
                  label="Description"
                  placeholder="Enter description"
                  name="description"
                  value={postInfo.description}
                  onChange={handleInputChange}
                  error={errors.description && 'Description is required'}
                />
                {errors.description && <span className="mt-2 text-sm text-rose-600">Description is required</span>}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleAddPost}>
                Create Post
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddPostModal;
