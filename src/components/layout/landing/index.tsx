"use client";
import React, { useState, useEffect } from "react";
import Announcement from "@/components/layout/announcement";
import SearchView from "./searchView";
import SearchService, { AnnouncementRes } from "@/services/search_services";

export default function Home() {
  const [announcementData, setAnnouncementData] =
    useState<AnnouncementRes | null>(null);

  useEffect(() => {
    async function fetchAnnouncementData() {
      try {
        const searchService = new SearchService();
        const data = await searchService.fetchAnnouncement();
        setAnnouncementData(data);
      } catch (error) {
        console.error("Error fetching announcement data:", error);
        setAnnouncementData(null);
      }
    }

    fetchAnnouncementData();
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pt-10 pb-4 p-16">
        <Announcement
          statementClass={"min-w-[550px]"}
          data={announcementData}
        />
      </div>
      <div className="flex flex-row  justify-center items-center h-full min-h-96 ">
        <div className="flex flex-col items-center justify-center gap-10 w-[746px] relative -top-16">
          <div className="text-justify leading-normal text-2xl font-bold ">
            LTV Search
          </div>
          <SearchView />
        </div>
      </div>
    </div>
  );
}
