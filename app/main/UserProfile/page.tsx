'use client';

import { useAppSelector } from "@/app/hooks/useAppDispatch";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const UserDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useAppSelector((state) => state.login);

  useEffect(() => {
    console.log(user);
    console.log(status);
    console.log(error);
  }, [dispatch, user]);

  return (
    <>
      {user ? (
        <>
          <p>Name: {user.username}</p>
          <p>Login ID: {user.id}</p>
        </>
      ) : (
        <p>No name</p>
      )}
    </>
  );
};

export default UserDetails;
