import {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {useUserContext} from '@/hooks/contextHooks';
import {useTheme} from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  // LeaderboardAd,
  // FullBannerAd,
  // MobileLeaderboardAd,
  /*
  MediumRectangleAd,
  LargeRectangleAd,
  */
  // SquareAd,
  // WideSkyscraperAd,
  // SkyscraperAd,
  // LargeMobileBannerAd,
} from '@/components/Ads';

export default function Layout() {
  const {handleAutoLogin, autoLoginLoading} = useUserContext();
  const {theme} = useTheme();
  const location = useLocation();

  const adminRoute = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    handleAutoLogin(); // Only runs once on mount
  }, []);

  if (autoLoginLoading) {
    return (
      <div className="text-center text-black p-4 bg-white">
        Loading user data...
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme}`}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-900">
          {!adminRoute && (
            <aside className="w-full lg:w-1/6 p-4">
             {/*  <div className="h-full border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg flex items-center justify-center bg-white dark:bg-gray-900">
              <MediumRectangleAd /> 
              </div>*/}
            </aside>
          )}
          <main className="flex-grow">
            <Outlet />
          </main>
          {!adminRoute && (
            <aside className="w-full lg:w-1/6 p-4">
             {/*  <div className="h-full border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg flex items-center justify-center bg-white dark:bg-gray-900">
               <LargeRectangleAd /> 
              </div>*/}
            </aside>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
