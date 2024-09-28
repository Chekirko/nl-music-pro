"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TeamSchema } from "@/lib/validations";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";

import { createTeam } from "@/lib/actions/team.action";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  mongoUserId: string;
}

const Team = ({ mongoUserId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // Доданий стан для прев'ю
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof TeamSchema>>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: "",
      description: "",
      church: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file); // Зберігаємо файл
      const previewUrl = URL.createObjectURL(file); // Створюємо URL для прев'ю
      setPhotoPreview(previewUrl); // Зберігаємо URL для показу
    }
  };

  const removePhoto = () => {
    setPhoto(null); // Видаляємо файл
    setPhotoPreview(null); // Скидаємо прев'ю
  };

  const uploadToCloudinary = async (photo: File) => {
    const formData = new FormData();
    formData.append("file", photo);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof TeamSchema>) {
    setIsSubmitting(true);

    try {
      let photoUrl = "";
      if (photo) {
        photoUrl = await uploadToCloudinary(photo); // Завантажуємо зображення через API
      }

      await createTeam({
        name: values.name,
        description: values.description,
        creator: JSON.parse(mongoUserId),
        church: values.church,
        path: "/teams",
        photo: photoUrl,
      });

      router.push("/teams");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Назва команди <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Вкажіть назву вашої групи прославлення
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="church"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Назва вашої церкви <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Вкажіть назву вашої церкви або міста
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Короткий опис вашого покликання
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Напиши, чим ви займаєтесь або яка ваша головна мета
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Завантажити фото команди{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange} // Обробка вибору файлу
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              {photoPreview && (
                <div className="mt-2">
                  <Image
                    width={60}
                    height={60}
                    src={photoPreview}
                    alt="Photo Preview"
                    className="size-32  rounded-full object-cover"
                  />
                  <Button
                    type="button"
                    onClick={removePhoto}
                    className="mt-2 text-white"
                  >
                    Видалити фото
                  </Button>
                </div>
              )}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? <>{"Створюю..."}</> : <>{"Створити"}</>}
        </Button>
      </form>
    </Form>
  );
};

export default Team;
