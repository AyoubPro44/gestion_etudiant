import React, { useEffect } from 'react'
import { FaRegNewspaper } from 'react-icons/fa'; // Example of using react-icons for icons
import PostCard from '../components/postCard';
import { logout } from '../services/authentification';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../services/postServices'


function Acceuil() {
  const news = [
    {
      id: 1,
      title: "Welcome Back to School!",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae eros nisi. Nam ullamcorper tortor nec eros iaculis, vitae vestibulum lacus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae eros nisi. Nam ullamcorper tortor nec eros iaculis, vitae vestibulum lacus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae eros nisi. Nam ullamcorper tortor nec eros iaculis, vitae vestibulum lacus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae eros nisi. Nam ullamcorper tortor nec eros iaculis, vitae vestibulum lacus lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae eros nisi. Nam ullamcorper tortor nec eros iaculis, vitae vestibulum lacus lacinia.",
      date: "July 1, 2024"
    },
    {
      id: 2,
      title: "Exciting Events This Month",
      description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis feugiat urna sit amet justo rutrum, vel scelerisque risus malesuada.",
      date: "June 28, 2024"
    },
    {
      id: 3,
      title: "New Sports Facilities Opened",
      description: "Vestibulum in turpis non nisi feugiat suscipit. Vivamus feugiat aliquet elit, sit amet consectetur lorem auctor vitae.",
      date: "June 25, 2024"
    }
  ];
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('auth')) {
      logout();
      navigate('/');
    }
  },[])

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return getAllPosts()
    }
  })
  
  return (
    <div className="py-12 p-6">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <FaRegNewspaper className="mr-4 text-indigo-500" />
          NOUVELLES ACTUALITÉS
        </h2>
        {posts?.map((post) => (
          <PostCard post={post}/>
        ))}
      </div>
    </div>
  );
};
export default Acceuil