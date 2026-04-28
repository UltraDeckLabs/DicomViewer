import React from 'react';
import type { IconProps } from '../types';

export const TabReport = (props: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* File body */}
      <path d="M4 2h9l5 5v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      {/* File fold/tab */}
      <path d="M13 2v5h5" />
      {/* Pen writing on file */}
      <path
        d="M7 14h6M7 17h4"
        strokeWidth="1.2"
      />
      {/* Pen tip */}
      <path
        d="M15.5 7.5l-1 1-2-2 1-1 2 2z"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M14.5 8.5l-2-2"
        strokeWidth="0.8"
      />
    </g>
  </svg>
);

export default TabReport;
