"use client"
import React, { useState } from 'react';
import SideBar from '@/components/layout/sidebar';
import NavBar from '@/components/layout/navbar';
import { SessionProvider } from '@/context/AuthContext';

interface NavigationContainerProps {}

const NavigationContainer: React.FC<NavigationContainerProps> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  return (
    <SessionProvider>
      <SideBar onClose={toggleDrawer(false)} open={open} />
      <NavBar showDrawer={toggleDrawer(true)} />
    </SessionProvider>
  );
};

export default NavigationContainer;