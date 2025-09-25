import { useState, useEffect, useCallback } from 'react';

export interface SystemMetrics {
  cpu: {
    usage: number;
    cores: number;
    temperature?: number;
    speed: number;
  };
  memory: {
    used: number;
    total: number;
    available: number;
    usage: number;
  };
  network: {
    download: number;
    upload: number;
    latency: number;
    connections: number;
  };
  storage: {
    used: number;
    total: number;
    available: number;
    usage: number;
  };
  security: {
    threats: number;
    firewall: boolean;
    antivirus: boolean;
    updates: boolean;
    lastScan: string;
  };
  processes: {
    total: number;
    topProcesses: Array<{
      name: string;
      cpu: number;
      memory: number;
      pid: number;
    }>;
  };
}

export interface BrowserTab {
  id: string;
  title: string;
  url: string;
  memoryUsage: number;
  cpuUsage: number;
  favicon?: string;
  isActive: boolean;
  category?: string;
  domain?: string;
}

export interface BrowserMetrics {
  tabs: BrowserTab[];
  totalMemory: number;
  totalCPU: number;
  tabCount: number;
}

export const useSystemMetrics = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [browserMetrics, setBrowserMetrics] = useState<BrowserMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate real system metrics with more realistic temperature detection
  const generateSystemMetrics = useCallback((): SystemMetrics => {
    const now = new Date();
    const timeOfDay = now.getHours();
    const dayOfWeek = now.getDay();
    
    // Simulate realistic metrics based on time of day and activity
    const baseCPU = timeOfDay > 9 && timeOfDay < 17 ? 25 : 15;
    const baseMemory = timeOfDay > 9 && timeOfDay < 17 ? 60 : 40;
    
    // More realistic CPU usage with spikes
    const cpuUsage = Math.max(5, Math.min(95, baseCPU + Math.random() * 20 - 10));
    
    // Calculate temperature based on CPU usage and time
    const baseTemp = 32; // Base temperature in Celsius
    const cpuTempIncrease = (cpuUsage / 100) * 25; // Up to 25°C increase based on CPU usage
    const timeTempIncrease = timeOfDay > 14 && timeOfDay < 18 ? 3 : 0; // Slightly hotter in afternoon
    const randomVariation = Math.random() * 4 - 2; // ±2°C random variation
    
    const temperature = Math.max(28, Math.min(85, baseTemp + cpuTempIncrease + timeTempIncrease + randomVariation));
    
    return {
      cpu: {
        usage: cpuUsage,
        cores: navigator.hardwareConcurrency || 8,
        temperature: Math.round(temperature * 10) / 10, // Round to 1 decimal
        speed: 2.4 + Math.random() * 1.6,
      },
      memory: {
        used: Math.floor(baseMemory + Math.random() * 20),
        total: 16,
        available: Math.floor(16 - (baseMemory + Math.random() * 20)),
        usage: baseMemory + Math.random() * 20,
      },
      network: {
        download: Math.floor(Math.random() * 100 + 50),
        upload: Math.floor(Math.random() * 50 + 20),
        latency: Math.floor(Math.random() * 50 + 10),
        connections: Math.floor(Math.random() * 50 + 10),
      },
      storage: {
        used: Math.floor(Math.random() * 200 + 100),
        total: 512,
        available: Math.floor(512 - (Math.random() * 200 + 100)),
        usage: ((Math.random() * 200 + 100) / 512) * 100,
      },
      security: {
        threats: Math.floor(Math.random() * 3),
        firewall: true,
        antivirus: true,
        updates: Math.random() > 0.3,
        lastScan: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
      },
      processes: {
        total: Math.floor(Math.random() * 100 + 50),
        topProcesses: [
          { name: 'chrome.exe', cpu: Math.random() * 15 + 5, memory: Math.random() * 200 + 100, pid: 1234 },
          { name: 'node.exe', cpu: Math.random() * 10 + 3, memory: Math.random() * 150 + 50, pid: 5678 },
          { name: 'explorer.exe', cpu: Math.random() * 5 + 1, memory: Math.random() * 100 + 50, pid: 9012 },
          { name: 'System', cpu: Math.random() * 8 + 2, memory: Math.random() * 80 + 40, pid: 3456 },
          { name: 'Windows Security', cpu: Math.random() * 3 + 1, memory: Math.random() * 60 + 30, pid: 7890 },
        ],
      },
    };
  }, []);

  // Get real browser tab information (limited by browser security)
  const generateBrowserMetrics = useCallback((): BrowserMetrics => {
    // Get current tab information
    const currentTab = {
      title: document.title || 'System Monitor AI',
      url: window.location.href,
      favicon: '🖥️',
      baseMemory: 45,
      baseCPU: 3.5,
      category: 'Development'
    };

    // Since we can't access other tabs, we'll show the current tab as the main one
    // and provide a notice about browser limitations
    const sampleTabs: BrowserTab[] = [
      {
        id: '1',
        title: currentTab.title,
        url: currentTab.url,
        memoryUsage: Math.max(10, Math.floor(currentTab.baseMemory + (Math.random() * 20 - 10))),
        cpuUsage: Math.max(0.1, currentTab.baseCPU + (Math.random() * 2 - 1)),
        favicon: currentTab.favicon,
        isActive: true,
        category: currentTab.category,
        domain: new URL(currentTab.url).hostname.replace('www.', ''),
      }
    ];

    // Note: Browser security prevents access to other tabs
    // This is a limitation of web browsers for security reasons
    const browserLimitationNotice = {
      id: 'notice',
      title: 'Browser Security Notice',
      url: 'about:blank',
      memoryUsage: 0,
      cpuUsage: 0,
      favicon: '🔒',
      isActive: false,
      category: 'System',
      domain: 'browser-security',
      isNotice: true
    };

    // Add the notice as a second "tab" to inform users
    sampleTabs.push(browserLimitationNotice as any);

    const totalMemory = sampleTabs.filter(tab => !(tab as any).isNotice).reduce((sum, tab) => sum + tab.memoryUsage, 0);
    const totalCPU = sampleTabs.filter(tab => !(tab as any).isNotice).reduce((sum, tab) => sum + tab.cpuUsage, 0);

    return {
      tabs: sampleTabs,
      totalMemory,
      totalCPU,
      tabCount: 1, // Only current tab is accessible
    };
  }, []);

  // Alternative: Create a more realistic simulation based on common browsing patterns
  const generateRealisticBrowserMetrics = useCallback((): BrowserMetrics => {
    const websiteTemplates = [
      {
        title: 'System Monitor AI - Dashboard',
        url: 'http://localhost:5174/dashboard',
        favicon: '🖥️',
        baseMemory: 45,
        baseCPU: 3.5,
        category: 'Development'
      },
      {
        title: 'GitHub - Repository',
        url: 'https://github.com/microsoft/vscode',
        favicon: '🐙',
        baseMemory: 35,
        baseCPU: 2.8,
        category: 'Development'
      },
      {
        title: 'Stack Overflow - React Hooks Question',
        url: 'https://stackoverflow.com/questions/react-hooks',
        favicon: '📚',
        baseMemory: 28,
        baseCPU: 1.5,
        category: 'Development'
      },
      {
        title: 'YouTube - React Tutorial',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        favicon: '📺',
        baseMemory: 120,
        baseCPU: 15.2,
        category: 'Media'
      },
      {
        title: 'Gmail - Inbox (3)',
        url: 'https://mail.google.com/mail/u/0/#inbox',
        favicon: '📧',
        baseMemory: 32,
        baseCPU: 1.8,
        category: 'Communication'
      },
      {
        title: 'Facebook - Home',
        url: 'https://www.facebook.com/home',
        favicon: '📘',
        baseMemory: 85,
        baseCPU: 8.5,
        category: 'Social'
      },
      {
        title: 'Twitter / X - Timeline',
        url: 'https://twitter.com/home',
        favicon: '🐦',
        baseMemory: 42,
        baseCPU: 4.2,
        category: 'Social'
      },
      {
        title: 'Amazon - Shopping Cart',
        url: 'https://www.amazon.com/cart',
        favicon: '🛒',
        baseMemory: 38,
        baseCPU: 2.1,
        category: 'Shopping'
      },
      {
        title: 'Netflix - Continue Watching',
        url: 'https://www.netflix.com/browse',
        favicon: '🎬',
        baseMemory: 95,
        baseCPU: 12.8,
        category: 'Media'
      },
      {
        title: 'LinkedIn - Feed',
        url: 'https://www.linkedin.com/feed',
        favicon: '💼',
        baseMemory: 48,
        baseCPU: 3.2,
        category: 'Professional'
      },
      {
        title: 'Reddit - Popular',
        url: 'https://www.reddit.com/r/popular',
        favicon: '🤖',
        baseMemory: 55,
        baseCPU: 5.5,
        category: 'Social'
      },
      {
        title: 'Google Docs - Untitled Document',
        url: 'https://docs.google.com/document/d/1234567890/edit',
        favicon: '📄',
        baseMemory: 62,
        baseCPU: 4.8,
        category: 'Productivity'
      },
      {
        title: 'Spotify - Web Player',
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
        favicon: '🎵',
        baseMemory: 75,
        baseCPU: 6.2,
        category: 'Media'
      },
      {
        title: 'Discord - General Chat',
        url: 'https://discord.com/channels/1234567890/1234567890',
        favicon: '💬',
        baseMemory: 68,
        baseCPU: 7.1,
        category: 'Communication'
      },
      {
        title: 'WhatsApp Web',
        url: 'https://web.whatsapp.com/',
        favicon: '💚',
        baseMemory: 52,
        baseCPU: 3.8,
        category: 'Communication'
      }
    ];

    // Randomly select 3-8 tabs to simulate realistic usage
    const numTabs = Math.floor(Math.random() * 6) + 3;
    const selectedTabs = websiteTemplates
      .sort(() => Math.random() - 0.5)
      .slice(0, numTabs);

    const sampleTabs: BrowserTab[] = selectedTabs.map((template, index) => {
      // Add some randomness to memory and CPU usage
      const memoryVariation = Math.random() * 20 - 10; // ±10MB variation
      const cpuVariation = Math.random() * 2 - 1; // ±1% variation
      
      // Extract domain from URL
      const domain = new URL(template.url).hostname.replace('www.', '');
      
      return {
        id: (index + 1).toString(),
        title: template.title,
        url: template.url,
        memoryUsage: Math.max(10, Math.floor(template.baseMemory + memoryVariation)),
        cpuUsage: Math.max(0.1, template.baseCPU + cpuVariation),
        favicon: template.favicon,
        isActive: index === 0, // First tab is active
        category: template.category,
        domain: domain,
      };
    });

    const totalMemory = sampleTabs.reduce((sum, tab) => sum + tab.memoryUsage, 0);
    const totalCPU = sampleTabs.reduce((sum, tab) => sum + tab.cpuUsage, 0);

    return {
      tabs: sampleTabs,
      totalMemory,
      totalCPU,
      tabCount: sampleTabs.length,
    };
  }, []);

  // Update metrics every 2 seconds
  useEffect(() => {
    const updateMetrics = () => {
      try {
        setMetrics(generateSystemMetrics());
        setBrowserMetrics(generateBrowserMetrics());
        setError(null);
      } catch (err) {
        setError('Failed to update system metrics');
        console.error('Metrics update error:', err);
      }
    };

    // Initial load
    updateMetrics();
    setIsLoading(false);

    // Set up interval
    const interval = setInterval(updateMetrics, 2000);

    return () => clearInterval(interval);
  }, [generateSystemMetrics, generateBrowserMetrics]);

  // Get performance color based on usage percentage
  const getPerformanceColor = (usage: number): string => {
    if (usage < 50) return 'text-green-600';
    if (usage < 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get performance status
  const getPerformanceStatus = (usage: number): string => {
    if (usage < 50) return 'Excellent';
    if (usage < 75) return 'Good';
    if (usage < 90) return 'Warning';
    return 'Critical';
  };

  return {
    metrics,
    browserMetrics,
    isLoading,
    error,
    getPerformanceColor,
    getPerformanceStatus,
    refresh: () => {
      setIsLoading(true);
      setTimeout(() => {
        setMetrics(generateSystemMetrics());
        setBrowserMetrics(generateBrowserMetrics());
        setIsLoading(false);
      }, 500);
    },
  };
};
