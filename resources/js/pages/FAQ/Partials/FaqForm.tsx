import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from '@/components/ui/input-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    question: z
        .string()
        .min(5, 'Question must be at least 5 characters.')
        .max(100, 'Question must be at most 100 characters.'),
    answer: z
        .string()
        .min(10, 'Answer must be at least 10 characters.')
        .max(500, 'Answer must be at most 500 characters.'),
});

export type FaqFormValues = z.infer<typeof formSchema>;

interface FaqFormProps {
    initialData?: FaqFormValues & { id?: number };
    submitUrl: string;
    method?: 'post' | 'put';
}

export function FaqForm({
    initialData,
    submitUrl,
    method = 'post',
}: FaqFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FaqFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            question: '',
            answer: '',
        },
    });

    const onSubmit = (data: FaqFormValues) => {
        setIsSubmitting(true);

        router[method](submitUrl, data, {
            onSuccess: () => {
                setIsSubmitting(false);
                if (method === 'post') form.reset();
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <form id="faq-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="question"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="question">Question</FieldLabel>
                            <Input
                                {...field}
                                id="question"
                                placeholder="Enter your question"
                                autoComplete="off"
                                required
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="answer"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="answer">Answer</FieldLabel>
                            <InputGroup>
                                <InputGroupTextarea
                                    {...field}
                                    id="answer"
                                    rows={6}
                                    className="min-h-24 resize-none"
                                    placeholder="Provide a detailed answer"
                                    required
                                />
                                <InputGroupAddon align="block-end">
                                    <InputGroupText className="tabular-nums">
                                        {field.value.length}/500
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="mt-4 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => router.get('/faqs')}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Saving...'
                        : method === 'post'
                          ? 'Create'
                          : 'Update'}
                </Button>
            </div>
        </form>
    );
}
