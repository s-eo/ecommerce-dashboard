import {type SubmitHandler, useForm} from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import type {Category, Product} from "../types.ts";

type IFormInput = Product;

const categories: Category[] = ['electronics', 'clothing', 'shoes', 'beauty'];

export default function NewProduct() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

    const mutation = useMutation({
        mutationFn: async (data: IFormInput) => {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return response.json();
        },
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        mutation.mutate(data);
    }

    const formLineClasses = "text-left mb-4";
    const labelClasses = "text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 w-[5rem] inline-block";
    const inputClasses = "px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <form
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-6 mt-20"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="flex mt-7">
                <div className="w-1/2">
                    <div className={formLineClasses}>
                        <label htmlFor="id" className={labelClasses}>ID</label>
                        <input
                            id="id"
                            type="number"
                            {...register("id", {required: true, valueAsNumber: true})}
                            className={inputClasses}
                        />
                        {errors.id && <p className="text-red-500 text-sm">ID is required</p>}
                    </div>

                    <div className={formLineClasses}>
                        <label htmlFor="price" className={labelClasses}>Price</label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            {...register("price", {required: true, valueAsNumber: true})}
                            className={inputClasses}
                        />
                        {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                    </div>

                    <div className={formLineClasses}>
                        <label htmlFor="category" className={labelClasses}>Category</label>
                        <select
                            id="category"
                            {...register("category", {required: true})}
                            className={`${inputClasses} capitalize text-sm`}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}
                                        className="capitalize text-sm">{category}</option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
                    </div>

                    <div className={formLineClasses}>
                        <label htmlFor="image" className={`${labelClasses} mb-2`}>Image</label>
                        <input
                            id="image"
                            type="file"
                            {...register("image", {required: true})}
                            className={inputClasses}
                        />
                        {errors.image && <p className="text-red-500 text-sm">Image is required</p>}
                    </div>
                </div>
                <div className="w-1/2">
                    <div className={formLineClasses}>
                        <label htmlFor="title" className={labelClasses}>Title</label>
                        <input
                            id="title"
                            {...register("title", {required: true})}
                            className={inputClasses}
                        />
                        {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                    </div>

                    <div className={formLineClasses}>
                        <label htmlFor="description" className={`${labelClasses} align-top`}>Description</label>
                        <textarea
                            id="description"
                            {...register("description", {required: true})}
                            className={inputClasses}
                            rows={4}
                        />
                        {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="cursor-pointer ml-auto mr-4 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
            >
                {mutation.isPending ? 'Submitting...' : 'Submit'}
            </button>

            {mutation.isSuccess && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                    Product created successfully!
                </div>
            )}

            {mutation.isError && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
                    Error creating product. Please try again.
                </div>
            )}
        </form>
    )
}