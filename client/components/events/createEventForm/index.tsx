'use client';

import { useMemo } from 'react';
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
import { useCreateEventMutation } from '@/redux/api/eventApi';

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

export function CreateEventForm() {
  const router = useRouter();

  const [createEvent, { isLoading }] = useCreateEventMutation();

  const { data: categoryResponse } = useGetCategoryTreeQuery();

  const categories = useMemo(() => {
    return categoryResponse ? flattenCategories(categoryResponse.data) : [];
  }, [categoryResponse]);

  const { control, handleSubmit, reset, setValue, watch } =
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

      const response = await createEvent(formData).unwrap();

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
          : 'Unable to login.';

      toast.error(message);
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Event</h1>

        <p className="text-muted-foreground">
          Fill in the details below to create a new event.
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
                Creating Event...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Create Event
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
    </section>
  );
}
