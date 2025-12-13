import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { useState, useEffect, type ReactNode } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const [isDismissed, setIsDismissed] = useState(false);
    const [chatbaseLoaded, setChatbaseLoaded] = useState(false);

    // Check if chatbot was dismissed in this session
    useEffect(() => {
        const dismissed = sessionStorage.getItem('chatbotDismissed');
        if (dismissed === 'true') {
            setIsDismissed(true);
        }
    }, []);

    // Load Chatbase script
    useEffect(() => {
        if (!chatbaseLoaded && !isDismissed) {
            const script = document.createElement('script');
            script.src = 'https://www.chatbase.co/embed.min.js';
            script.setAttribute('chatbotId', 'HYINTBGMKQVsPXALmjNAg'); // Replace with your actual Chatbot ID
            script.setAttribute('domain', 'www.chatbase.co');
            script.defer = true;
            document.body.appendChild(script);
            setChatbaseLoaded(true);

            return () => {
                // Cleanup script on unmount
                const existingScript = document.querySelector('script[src="https://www.chatbase.co/embed.min.js"]');
                if (existingScript) {
                    existingScript.remove();
                }
            };
        }
    }, [chatbaseLoaded, isDismissed]);

    const handleDismiss = (e) => {
        e.stopPropagation();
        setIsDismissed(true);
        sessionStorage.setItem('chatbotDismissed', 'true');
        
        // Hide Chatbase bubble
        const chatbaseBtn = document.querySelector('#chatbase-bubble-button');
        if (chatbaseBtn) {
            (chatbaseBtn as HTMLElement).style.display = 'none';
        }
        
        toast.info("Chat dismissed. Refresh page to enable again.");
    };

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}

        </AppLayoutTemplate>
    );
}