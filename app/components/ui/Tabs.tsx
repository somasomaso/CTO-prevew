"use client";

import React, { useState } from "react";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTabId, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      <div
        className="flex gap-1 border-b border-border"
        role="tablist"
        aria-label="Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors duration-150
              border-b-2 -mb-px
              ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
              }
            `}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="py-4"
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTabContent}
      </div>
    </div>
  );
}
