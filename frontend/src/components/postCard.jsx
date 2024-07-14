import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { POST_IMAGES_PATH, SERVERPOINT } from '../const';
import PostModal from './postModal';
import RemoveModal from './removeModal';
import { deletePost } from '../services/postServices';
import EditPostModal from './editPostModal';
import { Button, useDisclosure } from '@nextui-org/react';


function PostCard({ post, fetchPosts }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const role = localStorage.getItem('role')

  const handleDeletePost = async () => {
    const response = await deletePost(post.ID_POST, post.PHOTO)
    if (response.status === 200) {
      fetchPosts()
    }
  }
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6 relative">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={`${POST_IMAGES_PATH}${post.PHOTO}`} alt={post.TITLE} />
        <div className="absolute top-2 right-2 flex space-x-2">

          {
            role == 'admin' &&
            <div className='space-x-2'>
              <button
                onClick={onOpen}
                className="text-blue-500 hover:text-blue-700 p-2 bg-white rounded-full shadow-md"
              >
                <FaEdit size={16} />
              </button>
              <EditPostModal isOpen={isOpen} onOpenChange={onOpenChange} fetchPosts={fetchPosts} postInfo={post} />

              <RemoveModal
                button={
                  <button
                    className="text-red-500 hover:text-red-700 p-2 bg-white rounded-full shadow-md"
                  >
                    <FaTrash />
                  </button>
                }
                question="Are you sure you want to remove this post ?"
                onConfirm={handleDeletePost}
              />
            </div>
          }

        </div>
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.TITLE}</h3>
          <p className="text-sm text-gray-700 mb-2 line-clamp-3">{post.DESCRIPTION}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-600 text-sm">{post.DATE_POSTED}</span>
          <PostModal post={post} />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
