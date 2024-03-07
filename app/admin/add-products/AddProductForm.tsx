"use client";

import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import { Categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      reviews: "",
    },
  });

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      };
  };

  return (
    <>
      <Heading title="Add a Product" />
      <Input
        id="name"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
        autoFocus={true}
      />
      <Input
        id="price"
        label="Price"
        disabled={loading}
        register={register}
        errors={errors}
        type="number"
        required
        autoFocus={false}
      />
      <TextArea
        id="description"
        label="Description"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />

      <CustomCheckbox
        id={"inStock"}
        register={register}
        label="This Product is in stock"
      />

      <div className=" w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {Categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className=" font-bold mb-2 ">
            Select the available product colors and upload their pages
          </div>
          <div className="text-sm italic">
            You must upload an image for each of the color selected otherwise
            your color selection will be ignored
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={() => {}}
                removeImageFromState={() => {}}
                isProductCreated={false}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
