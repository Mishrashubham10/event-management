'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  createCategorySchema,
  CreateCategoryFormValues,
} from '@/schemas/category.schema';

import {
  useCreateCategoryMutation,
  flattenCategories,
  useGetCategoryTreeQuery,
} from '@/redux/api/categoryApi';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { data } = useGetCategoryTreeQuery();

  const categories = data ? flattenCategories(data.data) : [];

  const { control, handleSubmit, reset } = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),

    defaultValues: {
      name: '',
      parent: null,
    },
  });

  const onSubmit = async (values: CreateCategoryFormValues) => {
    try {
      const response = await createCategory(values).unwrap();

      toast.success(response.message);

      reset({
        name: '',
        parent: null,
      });

      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Category</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>

          <DialogDescription>Add a new event category.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>Category Name</FieldLabel>

                  <FieldContent>
                    <Input placeholder="Sports" {...field} />

                    <FieldError errors={[fieldState.error]} />
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              control={control}
              name="parent"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Parent Category</FieldLabel>

                  <FieldContent>
                    <Select
                      value={field.value ?? 'none'}
                      onValueChange={(value) =>
                        field.onChange(value === 'none' ? null : value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Root Category" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="none">Root Category</SelectItem>

                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}