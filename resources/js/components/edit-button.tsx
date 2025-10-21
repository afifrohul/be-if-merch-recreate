import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

type EditButtonProps = React.ComponentProps<typeof Button> & {
    url: string;
    label?: string;
};

export default function EditButton({
    url,
    label = 'Edit',
    ...props
}: EditButtonProps) {
    return (
        <Button
            size="sm"
            variant="outline"
            onClick={() => router.get(url)}
            {...props}
        >
            {label}
        </Button>
    );
}
