'use client'

import React from 'react'

interface LayoutWrapperProps {
  navbar?: React.ReactNode
  children: React.ReactNode
  menubar?: React.ReactNode
}

export default function LayoutWrapper({ navbar, children, menubar }: LayoutWrapperProps) {
  return (
    <>
      {navbar}
      <div id="LayoutWrapper" className="flex-1 flex">
        <div className="w-full">{children}</div>
      </div>
      {menubar}
    </>
  )
}
