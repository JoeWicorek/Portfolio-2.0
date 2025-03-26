'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Remove iframe approach, directly serve index.html
    window.location.href = '/index.html';
  }, []);

  return null;
}
