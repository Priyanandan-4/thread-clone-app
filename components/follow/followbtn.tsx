import axiosInstance from '@/API/axiosinstance';
import React, { useEffect } from 'react';

interface FollowButtonProps {
    userId: string;
}

const FollowBtn: React.FC<FollowButtonProps> = ({ userId }) => {
    const [isFollowing, setIsFollowing] = React.useState<boolean>(false);
    const senderId = localStorage.getItem('userId');

    const followCheck = async () => {
        try {
            const res = await axiosInstance.get(`api/users/${userId}`);
            const user = res.data.user;
            // Assuming user has a property that indicates if the sender is following them
            setIsFollowing(user.isFollowed); // Adjust based on your API response
        } catch (error) {
            console.error("Error fetching follow status:", error);
        }
    };

    const handleFollow = async () => {
        if (!senderId) {
            console.error("User ID not found in localStorage");
            return;
        }
        
        try {
            if (isFollowing) {
                await axiosInstance.post(`api/users/unfollow/${userId}`, { userUnfollowId: senderId });
                setIsFollowing(false);
            } else {
                await axiosInstance.post(`api/users/follow/${userId}`, { userFollowId: senderId });
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Error during follow/unfollow:', error);
        }
    };

    useEffect(() => {
        followCheck();
    }, [userId]);

    return (
        <button onClick={handleFollow} className='border-[#2d2d2d] border w-20 text-sm rounded-lg h-10'>
            {isFollowing ? 'Followed' : 'Follow'}
        </button>
    );
};

export default FollowBtn;
