import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Button } from '@nextui-org/react';
import { POST_IMAGES_PATH } from '../const';
import { updatePost } from '../services/postServices';

const EditPostModal = ({ isOpen, onOpenChange, fetchPosts, postInfo }) => {
    const [editedPostInfo, setEditedPostInfo] = useState({
        id_post: postInfo.ID_POST,
        image: postInfo.PHOTO || '',
        title: postInfo.TITLE || '',
        description: postInfo.DESCRIPTION || ''
    });
    const [imagePreview, setImagePreview] = useState(postInfo.PHOTO || null);
    const [errors, setErrors] = useState({
        title: false,
        description: false
    });

    const [isImageEdited, setIsImageEdited] = useState(false);

    useEffect(() => {
        setEditedPostInfo({
            id_post: postInfo.ID_POST,
            image: postInfo.PHOTO || '',
            title: postInfo.TITLE || '',
            description: postInfo.DESCRIPTION || ''
        });
        setImagePreview(`${POST_IMAGES_PATH}${postInfo.PHOTO}` || null);
    }, [postInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPostInfo({ ...editedPostInfo, [name]: value });
        setErrors({ ...errors, [name]: false });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedPostInfo({ ...editedPostInfo, image: reader.result });
                setImagePreview(reader.result);
                setIsImageEdited(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdatePost = async () => {
        const { id_post, title, description } = editedPostInfo;

        if (!title.trim() || !description.trim()) {
            setErrors({
                title: !title.trim(),
                description: !description.trim()
            });
            return;
        }

        const updatedPost = {
            id_post,
            title,
            description,
            image: editedPostInfo.image,
            id_admin: localStorage.getItem('id_admin')
        };

        try {
            await updatePost(updatedPost.id_post, updatedPost.title, updatedPost.description, updatedPost.image, isImageEdited)
            await fetchPosts();
            setIsImageEdited(false);
            onOpenChange(false); 
        } catch (error) {
            console.error('Failed to update post:', error);
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
                        <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col items-center space-y-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        id="fileInputEdit"
                                        style={{ display: 'none' }}
                                    />
                                    <div
                                        onClick={() => document.getElementById('fileInputEdit').click()}
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
                                    value={editedPostInfo.title}
                                    onChange={handleInputChange}
                                    error={errors.title && 'Title is required'}
                                />
                                {errors.title && <span className="mt-2 text-sm text-rose-600">Title is required</span>}
                                <Textarea
                                    label="Description"
                                    placeholder="Enter description"
                                    name="description"
                                    value={editedPostInfo.description}
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
                            <Button color="primary" onPress={handleUpdatePost}>
                                Update Post
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditPostModal;
