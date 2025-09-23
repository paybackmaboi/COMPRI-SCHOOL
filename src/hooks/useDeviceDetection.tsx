import { useState, useEffect } from 'react';

export interface DetectedDevice {
  id: string;
  name: string;
  type: 'mobile' | 'tablet' | 'laptop' | 'desktop';
  os: string;
  browser: string;
  screenSize: string;
  isOnline: boolean;
  lastSeen: string;
}

export function useDeviceDetection() {
  const [currentDevice, setCurrentDevice] = useState<DetectedDevice | null>(null);
  const [connectedDevices, setConnectedDevices] = useState<DetectedDevice[]>([]);

  useEffect(() => {
    const detectCurrentDevice = (): DetectedDevice => {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const hasTouch = 'ontouchstart' in window;

      // Detect device type
      let deviceType: DetectedDevice['type'] = 'desktop';
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        if (/iPad/i.test(userAgent) || (hasTouch && screenWidth >= 768)) {
          deviceType = 'tablet';
        } else {
          deviceType = 'mobile';
        }
      } else if (hasTouch && screenWidth < 1200) {
        deviceType = 'laptop';
      } else if (screenWidth >= 1200) {
        deviceType = 'desktop';
      } else {
        deviceType = 'laptop';
      }

      // Detect OS
      let os = 'Unknown';
      if (/Windows/i.test(userAgent)) os = 'Windows';
      else if (/Mac/i.test(userAgent)) os = 'macOS';
      else if (/Linux/i.test(userAgent)) os = 'Linux';
      else if (/Android/i.test(userAgent)) os = 'Android';
      else if (/iPhone|iPad|iPod/i.test(userAgent)) os = 'iOS';

      // Detect browser
      let browser = 'Unknown';
      if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) browser = 'Chrome';
      else if (/Firefox/i.test(userAgent)) browser = 'Firefox';
      else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) browser = 'Safari';
      else if (/Edge/i.test(userAgent)) browser = 'Edge';

      // Generate device name
      const deviceName = `${os} ${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}`;

      return {
        id: 'current-device',
        name: deviceName,
        type: deviceType,
        os,
        browser,
        screenSize: `${screenWidth}x${screenHeight}`,
        isOnline: navigator.onLine,
        lastSeen: new Date().toLocaleTimeString()
      };
    };

    const device = detectCurrentDevice();
    setCurrentDevice(device);

    // Simulate additional connected devices for demo
    const mockDevices: DetectedDevice[] = [
      {
        id: 'device-1',
        name: 'iPhone 14 Pro',
        type: 'mobile',
        os: 'iOS',
        browser: 'Safari',
        screenSize: '393x852',
        isOnline: true,
        lastSeen: '2 minutes ago'
      },
      {
        id: 'device-2',
        name: 'MacBook Pro',
        type: 'laptop',
        os: 'macOS',
        browser: 'Chrome',
        screenSize: '1440x900',
        isOnline: false,
        lastSeen: '15 minutes ago'
      },
      {
        id: 'device-3',
        name: 'Samsung Galaxy S23',
        type: 'mobile',
        os: 'Android',
        browser: 'Chrome',
        screenSize: '360x780',
        isOnline: true,
        lastSeen: 'Just now'
      }
    ];

    setConnectedDevices([device, ...mockDevices]);

    // Update online status
    const handleOnline = () => {
      setCurrentDevice(prev => prev ? { ...prev, isOnline: true } : null);
    };
    
    const handleOffline = () => {
      setCurrentDevice(prev => prev ? { ...prev, isOnline: false } : null);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { currentDevice, connectedDevices };
}