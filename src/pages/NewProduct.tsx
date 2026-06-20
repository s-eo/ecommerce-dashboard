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

    return (
        <form className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-6"
              onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 mb-4">
                <label htmlFor="id" className="text-sm font-medium text-gray-700 dark:text-gray-300">ID</label>
                <input
                    id="id"
                    type="number"
                    {...register("id", { required: true, valueAsNumber: true })}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.id && <span className="text-red-500 text-sm">ID is required</span>}
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                    id="title"
                    {...register("title", { required: true })}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <label htmlFor="price" className="text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                <input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { required: true, valueAsNumber: true })}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <span className="text-red-500 text-sm">Price is required</span>}
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                    id="description"
                    {...register("description", { required: true })}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                />
                {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select
                    id="category"
                    {...register("category", { required: true })}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                <input
                    id="image"
                    {...register("image", { required: true })}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.image && <span className="text-red-500 text-sm">Image URL is required</span>}
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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