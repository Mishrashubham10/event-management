'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

import {
  createEventSchema,
  CreateEventFormValues,
} from '@/schemas/event.schema';
import {
  flattenCategories,
  useGetCategoryTreeQuery,
} from '@/redux/api/categoryApi';
import {
  Event,
  useCreateEventMutation,
  useUpdateEventMutation,
} from '@/redux/api/eventApi';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

import { ROUTES } from '@/config/route';
import Image from 'next/image';
import { getImageUrl } from '@/utils/getImgUrl';

interface EventFormProps {
  mode: 'create' | 'edit';
  event?: Event;
}

export function EventForm({ mode, event }: EventFormProps) {
  const router = useRouter();

  const [createEvent, createState] = useCreateEventMutation();
  const [updateEvent, updateState] = useUpdateEventMutation();

  const isLoading = createState.isLoading || updateState.isLoading;

  const { data: categoryResponse } = useGetCategoryTreeQuery();

  const categories = useMemo(() => {
    return categoryResponse ? flattenCategories(categoryResponse.data) : [];
  }, [categoryResponse]);

  const { control, handleSubmit, reset, setValue } =
    useForm<CreateEventFormValues>({
      resolver: zodResolver(createEventSchema),

      defaultValues: {
        title: '',
        description: '',
        category: '',
        publishAt: undefined,
        photos: [],
      },
    });

  useEffect(() => {
    if (!event) return;

    reset({
      title: event.title,
      description: event.description,
      category: event.category._id,
      publishAt: new Date(event.publishAt),
      photos: [],
    });
  }, [event, reset]);

  const photos = useWatch({
    control,
    name: 'photos',
  });

  const imagePreviews = useMemo(() => {
    if (!photos?.length) return [];

    return photos.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  }, [photos]);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (files.length > 3) {
      toast.error('Maximum 3 images allowed.');

      return;
    }

    setValue('photos', files, {
      shouldValidate: true,
    });
  };

  const removeImage = (index: number) => {
    if (!photos) return;

    const updated = [...photos];

    updated.splice(index, 1);

    setValue('photos', updated, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (values: CreateEventFormValues) => {
    try {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('publishAt', values.publishAt.toISOString());

      values.photos?.forEach((photo) => {
        formData.append('photos', photo);
      });

      const response =
        mode === 'create'
          ? await createEvent(formData).unwrap()
          : await updateEvent({
              id: event!._id,
              body: formData,
            }).unwrap();

      toast.success(response.message);

      reset();

      router.push(ROUTES.ADMIN_EVENTS);
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as { data?: { message?: string } }).data?.message ===
          'string'
          ? (error as { data?: { message?: string } }).data?.message
          : mode === 'create'
            ? 'Unable to create event.'
            : 'Unable to update event.';

      toast.error(message);
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1>{mode === 'create' ? 'Create Event' : 'Edit Event'}</h1>

        <p>
          {mode === 'create'
            ? 'Fill in the details below to create a new event.'
            : 'Update the event details below.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          {/* Title */}

          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>Title</FieldLabel>

                <FieldContent>
                  <Input placeholder="Football Tournament" {...field} />

                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />

          {/* Description */}
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>Description</FieldLabel>

                <FieldContent>
                  <Textarea
                    rows={5}
                    placeholder="Describe your event..."
                    {...field}
                  />

                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />

          {/* Category */}

          <Controller
            control={control}
            name="category"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>Category</FieldLabel>

                <FieldContent>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />

          {/* Publish Date */}

          <Controller
            control={control}
            name="publishAt"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>Publish Date</FieldLabel>

                <FieldContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          'justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Select Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>

                  <FieldError errors={[fieldState.error]} />
                </FieldContent>
              </Field>
            )}
          />

          {/* Images */}

          {mode === 'edit' && event?.photos.length ? (
            <div className="space-y-3">
              <FieldLabel>Current Photos</FieldLabel>

              <div className="grid grid-cols-3 gap-4">
                {event.photos.map((photo) => (
                  <Image
                    key={photo.filename}
                    src={getImageUrl(photo.url)}
                    alt={event.title}
                    width={150}
                    height={120}
                    className="rounded-lg border object-cover"
                    unoptimized
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                Upload new photos below to replace these images.
              </p>
            </div>
          ) : null}

          <Field>
            <FieldLabel>Event Photos</FieldLabel>

            <FieldContent>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
              />

              <p className="text-xs text-muted-foreground">Maximum 3 images.</p>
            </FieldContent>
          </Field>

          {/* Preview */}

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {imagePreviews.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border"
                >
                  <Image
                    src={image.preview}
                    alt="preview"
                    className="h-40 w-full object-cover"
                    width={100}
                    height={40}
                    unoptimized
                  />

                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'create' ? 'Creating Event...' : 'Updating Event...'}
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {mode === 'create' ? 'Create Event' : 'Update Event'}
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
    </section>
  );
}
