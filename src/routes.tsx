import Index from './pages/Index';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import NotFound from './pages/NotFound';
import ThankYou from './pages/ThankYou';

export const routes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/thank-you',
    element: <ThankYou />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]; 