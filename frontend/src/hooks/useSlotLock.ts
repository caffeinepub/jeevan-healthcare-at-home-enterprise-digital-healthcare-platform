import { useState, useEffect, useRef, useCallback } from 'react';

const LOCK_DURATION_SECONDS = 5 * 60; // 5 minutes

export interface SlotLockState {
  lockedSlot: string | null;
  remainingSeconds: number;
  lockSlot: (slot: string) => void;
  clearLock: () => void;
}

export function useSlotLock(): SlotLockState {
  const [lockedSlot, setLockedSlot] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearLock = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setLockedSlot(null);
    setRemainingSeconds(0);
  }, []);

  const lockSlot = useCallback(
    (slot: string) => {
      // Clear any existing lock first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setLockedSlot(slot);
      setRemainingSeconds(LOCK_DURATION_SECONDS);

      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setLockedSlot(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { lockedSlot, remainingSeconds, lockSlot, clearLock };
}
