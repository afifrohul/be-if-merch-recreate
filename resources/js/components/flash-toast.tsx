import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface FlashProps {
    flash?: {
        success?: string;
        error?: string;
        info?: string;
    };
}

export default function FlashToast() {
    const { flash } = usePage().props as FlashProps;
    const lastFlashRef = useRef<string | null>(null);

    useEffect(() => {
        const flashKey = JSON.stringify(flash);
        if (flashKey === lastFlashRef.current) return;

        lastFlashRef.current = flashKey;

        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        if (flash?.info) toast(flash.info);
    }, [flash]);

    return null;
}
