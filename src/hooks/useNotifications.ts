import { useState } from "react";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type:
    | "reservation"
    | "system"
    | "analytics"
    | "account";

  priority:
    | "high"
    | "medium"
    | "low";

  pinned: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>([
      {
        id:"1",
        title:"New Reservation",
        message:"Ahmed booked Table 4.",
        time:"Just now",
        read:false,
        type:"reservation",
        priority:"high",
        pinned:false,
      },
      {
        id:"2",
        title:"Reservation Confirmed",
        message:"Sara reservation confirmed.",
        time:"10 min ago",
        read:true,
        type:"system",
        priority:"medium",
        pinned:true,
      },
    ]);

  const unread =
    notifications.filter(
      n => !n.read
    ).length;

  const markRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id
          ? { ...n, read: true }
          : n
      )
    );
  };

  const markAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({
        ...n,
        read: true,
      }))
    );
  };

  const removeNotification = (
    id: string
  ) => {
    setNotifications(prev =>
      prev.filter(
        n => n.id !== id
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const addNotification = (
    title: string,
    message: string
  ) => {
    setNotifications(prev => [
      {
        id:Date.now().toString(),
        title,
        message,
        time:"Just now",
        read:false,
        type:"reservation",
        priority:"high",
        pinned:false,
      },
      ...prev,
    ]);
  };

  const togglePin=(id:string)=>{
  setNotifications(prev=>
  prev.map(n=>
  n.id===id
  ?{
  ...n,
  pinned:!n.pinned
  }
  :n
  )
  );
  };

  return {
    notifications,
    unread,
    addNotification,
    markRead,
    markAllRead,
    removeNotification,
    togglePin,
    clearAll,
  };

  }