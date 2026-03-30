// Analytics Tracking Utilities

// Facebook Pixel Events
declare global {
  interface Window {
    fbq: any;
    gtag: any;
    dataLayer: any[];
  }
}

export const Analytics = {
  // Facebook Pixel
  facebook: {
    // Track page view
    pageView: () => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "PageView");
      }
    },

    // Track lead capture
    lead: (contentName: string, value?: number) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: contentName,
          value: value || 0,
          currency: "USD",
        });
      }
    },

    // Track complete registration
    completeRegistration: (contentName?: string) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "CompleteRegistration", {
          content_name: contentName || "Registration",
        });
      }
    },

    // Track initiate checkout
    initiateCheckout: (value: number, currency = "USD") => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          value,
          currency,
        });
      }
    },

    // Track purchase
    purchase: (value: number, currency = "USD", orderId?: string) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Purchase", {
          value,
          currency,
          order_id: orderId,
        });
      }
    },

    // Track custom event
    custom: (eventName: string, params?: Record<string, any>) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("trackCustom", eventName, params);
      }
    },
  },

  // Google Analytics 4
  ga4: {
    // Track page view
    pageView: (pageTitle?: string, pageLocation?: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "page_view", {
          page_title: pageTitle || document.title,
          page_location: pageLocation || window.location.href,
        });
      }
    },

    // Track form submission
    formSubmit: (formName: string, formId?: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "form_submit", {
          form_name: formName,
          form_id: formId,
        });
      }
    },

    // Track lead generation
    generateLead: (value?: number, currency = "USD") => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "generate_lead", {
          value,
          currency,
        });
      }
    },

    // Track sign up
    signUp: (method: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "sign_up", {
          method,
        });
      }
    },

    // Track custom event
    event: (eventName: string, params?: Record<string, any>) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, params);
      }
    },
  },

  // Custom Events
  custom: {
    // Track landing page view
    landingPageView: (pageName: string, source?: string) => {
      if (typeof window !== "undefined") {
        // GA4
        if (window.gtag) {
          window.gtag("event", "landing_page_view", {
            page_name: pageName,
            source: source || "direct",
          });
        }
        // Facebook
        if (window.fbq) {
          window.fbq("trackCustom", "LandingPageView", {
            page_name: pageName,
            source: source || "direct",
          });
        }
      }
    },

    // Track CTA click
    ctaClick: (ctaName: string, ctaLocation: string) => {
      if (typeof window !== "undefined") {
        if (window.gtag) {
          window.gtag("event", "cta_click", {
            cta_name: ctaName,
            cta_location: ctaLocation,
          });
        }
        if (window.fbq) {
          window.fbq("trackCustom", "CTAClick", {
            cta_name: ctaName,
            cta_location: ctaLocation,
          });
        }
      }
    },

    // Track scroll depth
    scrollDepth: (percentage: number) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "scroll", {
          percent_scrolled: percentage,
        });
      }
    },

    // Track time on page
    timeOnPage: (seconds: number) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "time_on_page", {
          engagement_time_msec: seconds * 1000,
        });
      }
    },
  },

  // UTM Tracking
  utm: {
    // Get UTM parameters from URL
    getParams: () => {
      if (typeof window === "undefined") return {};

      const urlParams = new URLSearchParams(window.location.search);
      return {
        source: urlParams.get("utm_source"),
        medium: urlParams.get("utm_medium"),
        campaign: urlParams.get("utm_campaign"),
        content: urlParams.get("utm_content"),
        term: urlParams.get("utm_term"),
      };
    },

    // Store UTM parameters in localStorage
    storeParams: () => {
      const params = Analytics.utm.getParams();
      if (typeof window !== "undefined" && Object.values(params).some(Boolean)) {
        localStorage.setItem("utm_params", JSON.stringify(params));
      }
    },

    // Retrieve stored UTM parameters
    getStoredParams: () => {
      if (typeof window === "undefined") return {};
      const stored = localStorage.getItem("utm_params");
      return stored ? JSON.parse(stored) : {};
    },
  },
};

// Initialize tracking
export const initializeAnalytics = () => {
  if (typeof window === "undefined") return;

  // Store UTM params on page load
  Analytics.utm.storeParams();

  // Track scroll depth
  let scrollTracked = { 25: false, 50: false, 75: false, 90: false };

  const handleScroll = () => {
    const scrollPercent =
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    Object.keys(scrollTracked).forEach((threshold) => {
      const percent = parseInt(threshold);
      if (scrollPercent >= percent && !scrollTracked[percent as keyof typeof scrollTracked]) {
        Analytics.custom.scrollDepth(percent);
        scrollTracked[percent as keyof typeof scrollTracked] = true;
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Track time on page
  let startTime = Date.now();

  const trackTimeOnPage = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    Analytics.custom.timeOnPage(timeSpent);
  };

  window.addEventListener("beforeunload", trackTimeOnPage);

  // Return cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("beforeunload", trackTimeOnPage);
  };
};

export default Analytics;
