import React, { useEffect, useState } from 'react';
import { FaRegNewspaper } from 'react-icons/fa';
import PostCard from '../components/postCard';
import { logout } from '../services/authentification';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../services/postServices';
import { Button, useDisclosure } from '@nextui-org/react';
import { IoMdAdd } from "react-icons/io";
import AddPostModal from '../components/addPostModal';

function Acceuil() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      logout();
      navigate('/');
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };


  return (
    <div className="py-12 p-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaRegNewspaper className="mr-4 text-indigo-500" />
            NOUVELLES ACTUALITÉS
          </h2>
          {
            role === 'admin' &&
            <Button className="bg-indigo-500 text-white" onPress={onOpen} startContent={<IoMdAdd />}>
              New Post
            </Button>
          }
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              fetchPosts={fetchPosts}
            />
          ))}
        </div>
      </div>

      <AddPostModal isOpen={isOpen} onOpenChange={onOpenChange} fetchPosts={fetchPosts} />
    </div>
  );
}

export default Acceuil;
