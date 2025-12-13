import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { useState, useEffect, type ReactNode } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from '@inertiajs/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        email: '',
        suggestion: ''
    });

    // Check if suggestion box was dismissed in this session
    useEffect(() => {
        const dismissed = sessionStorage.getItem('suggestionBoxDismissed');
        if (dismissed === 'true') {
            setIsDismissed(true);
        }
    }, []);

    const handleDismiss = (e) => {
        e.stopPropagation(); // Prevent opening the dialog
        setIsDismissed(true);
        sessionStorage.setItem('suggestionBoxDismissed', 'true');
        toast.info("You can always share feedback later!");
    };

    const handleSubmit = () => {
        if (!data.suggestion.trim()) return;
        
        post('/suggestions', {
            onSuccess: () => {
                setSubmitSuccess(true);                
                // Reset form and close modal after 3 seconds
                setTimeout(() => {
                    reset();
                    setSubmitSuccess(false);
                    setIsOpen(false);
                }, 3000);
            },
            onError: (errors) => {
                console.error('Submission error:', errors);
                toast.error("Something went wrong. Please try again.");
            }
        });
    };

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}

            {/* Only show button if not dismissed */}
            {!isDismissed && (
                <div className="fixed bottom-6 right-6 z-50">
                    <div className="relative">
                        {/* X dismiss button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-10"
                            title="Dismiss feedback button"
                        >
                            <X className="w-3.5 h-3.5 text-white" />
                        </button>

                        {/* Main feedback button */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 relative animate-bounce"
                            style={{
                                animation: 'bounce 2s infinite'
                            }}
                        >
                            <MessageSquare className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            {/* Suggestion Form Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary">
                            We'd Love Your Feedback! 💡
                        </DialogTitle>
                        <DialogDescription>
                            Help us improve StampBayan by sharing your suggestions or ideas.
                        </DialogDescription>
                    </DialogHeader>

                    {submitSuccess ? (
                        <div className="py-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Thank You!
                            </h3>
                            <p className="text-gray-600">
                                Your suggestion has been received. We appreciate your feedback!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4 py-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="your@email.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Suggestion <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="suggestion"
                                    name="suggestion"
                                    value={data.suggestion}
                                    onChange={(e) => setData('suggestion', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                                    placeholder="Tell us what you think..."
                                />
                                {errors.suggestion && (
                                    <p className="text-red-500 text-xs mt-1">{errors.suggestion}</p>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={processing || !data.suggestion.trim()}
                                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Submit Suggestion
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <style>{`
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </AppLayoutTemplate>
    );
}