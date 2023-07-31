"use client"

import * as RadixTooltip from '@radix-ui/react-tooltip';
import React from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="py-1 px-2 text-xs bg-gray-800 rounded"
            sideOffset={5}
          >
            {content}
            <RadixTooltip.Arrow className="fill-gray-800" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
