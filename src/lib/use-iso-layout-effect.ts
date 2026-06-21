import { useEffect, useLayoutEffect } from 'react'

// useLayoutEffect on the client (runs before paint → no FOUC of animated nodes),
// useEffect on the server (avoids the SSR warning).
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
