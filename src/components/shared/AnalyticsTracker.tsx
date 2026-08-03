import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { supabase } from '@/api/config';

const recordPageView = async (path: string, sessionId: string) => {
  try {
    // Record page view in Supabase page_views table
    await supabase.from('page_views').insert({
      path,
      session_id: sessionId
    });
  } catch (e) {
    // Fail silently so it doesn't affect user experience if database limits are hit or offline
    console.error("Traffic logging failed silently:", e);
  }
};

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Create unique session ID
    let sessionId = sessionStorage.getItem('ygk_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('ygk_session_id', sessionId);
    }

    recordPageView(location.pathname, sessionId);
  }, [location.pathname]);

  return null;
}
