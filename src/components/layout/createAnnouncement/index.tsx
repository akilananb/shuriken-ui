"use client";
import React, { useState, useMemo } from "react";
import InputComponent from "@/components/common/input";
import SearchService, { AnnouncementRes } from "@/services/search_services";

const CreateAnnouncement = () => {
  const [announcementText, setAnnouncementText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function fetchAnnouncementData() {
    try {
      const searchService = new SearchService();
      const data: AnnouncementRes = await searchService.fetchAnnouncement();
      const announcementMessage: string = data.message;
      setAnnouncementText(announcementMessage);
    } catch (error) {
      console.error("Error fetching announcement data:", error);
      setAnnouncementText("");
    }
  }

  useMemo(() => {
    fetchAnnouncementData();
  }, []);

  const onCreateAnnouncement = async () => {
    try {
      if (announcementText.length > 1500) {
        setErrorMessage("Announcement cannot exceed 1500 characters");
        return;
      }

      const response = await fetch(
        `/shuriken/api/asset-query-svc/api/v1/announcement/create-announcement`,
        {
          method: "POST",
          body: JSON.stringify({ message: announcementText }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create announcement");
      }
      setAnnouncementText("");
      setErrorMessage("");
    } catch (error) {
      console.error("Oops! Something went wrong");
    }
  };

  return (
    <div className="flex flex-col bg-white h-full p-16 pt-8">
      <div className="text-xl font-bold mb-8">Announcements</div>
      <InputComponent
        placeholder="Create Announcement"
        inputtype="TEXT"
        value={announcementText}
        onChangeListener={(value) => {
          setAnnouncementText(value);
          if (errorMessage) setErrorMessage("");
        }}
        isUpdate={false}
      />
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div className="flex justify-end">
        <button
          className="asset-add-override-button mt-8"
          onClick={onCreateAnnouncement}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default CreateAnnouncement;
