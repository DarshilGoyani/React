import { useEffect, useState } from "react";
import { type productFetchType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { fetchSingleProduct, updateProduct } from "../services/ProductService";

export default function EditProductPage() {

    const { productId } = useParams();
    const navigate = useNavigate();


    const [productData, setProductData] = useState<productFetchType>({
        id: "",
        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "",
        p_category: "",
        p_description: "",
    });

    const productCategory = [
        "Grocery",
        "Fruits & Vegetables",
        "Dairy & Bakery",
        "Staples (Rice, Atta, Pulses)",
        "Snacks & Beverages",
        "Packaged Foods",
        "Personal Care",
        "Household Supplies",
        "Home & Living",
        "Sports",
        "Fashion",
        "Books"
    ];

    // Shared Tailwind classes for consistent styling
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";
    const inputClasses = "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400";

    useEffect(() => {
        if (productId) {
            getSingleProductData();
        }
    }, [productId]);

    async function getSingleProductData() {
        try {
            const data = await fetchSingleProduct(productId || "");
            if (data) {
                setProductData(data);
            }
        } catch (error) {
            console.error("Error fetching single product:", error);
            toast.error("Failed to fetch product details");
        }
    }

    const onHandleChange = (event: any) => {
        const { name, value } = event.target;
        setProductData(prev => ({ ...prev, [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value }));
    }

    const [error, setError] = useState<any>({});

    const validation = () => {
        let newError: any = {};

        if (!productData.p_name) {
            newError.p_name = "Product name is required..";
        }

        if (productData.p_price <= 0) {
            newError.p_price = "Product price must be greater than 0..";
        }

        if (productData.p_stock <= 0) {
            newError.p_stock = "Product stock must be greater than 0..";
        }

        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        if (!productData.p_image) {
            newError.p_image = "Product image URL is required..";
        } else if (!urlPattern.test(productData.p_image)) {
            newError.p_image = "Invalid image URL..";
        }

        if (!productData.p_category) {
            newError.p_category = "Product category is required..";
        }

        if (!productData.p_description) {
            newError.p_description = "Product description is required..";
        }

        setError(newError);
        return Object.keys(newError).length;
    };

    const onHandleSubmit = async (event: any) => {
        event.preventDefault();

        if (validation() !== 0) {
            return;
        }

        console.log("Product Data : ", productData);

        // update product
        const status = await updateProduct(productData);

        if (status) {
            toast.success("Product updated successfully!");
            navigate('/viewProduct');
        }

    }
    return (
        <div className="max-w-2xl mx-auto">
            {/* Page Header */}
            <div className="mb-8 border-b border-slate-100 pb-5">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Update Product
                </h1>
                <p className="mt-2 text-slate-500">
                    Fill in the details below to list a new item in your inventory.
                </p>
            </div>

            {/* Form Card */}
            <form className="space-y-6" onSubmit={onHandleSubmit}>
                {/* Row 1: Product Name */}
                <div>
                    <label className={labelClasses}>Product Name</label>
                    <input
                        type="text"
                        name="p_name"
                        value={productData.p_name}
                        onChange={onHandleChange}
                        placeholder="e.g. Wireless Noise Cancelling Headphones"
                        className={`${inputClasses} ${error.p_name ? 'border-red-500' : ''}`}
                    />
                    {error.p_name && <p className="text-red-500 text-xs mt-1">{error.p_name}</p>}
                </div>

                {/* Row 2: Price & Stock (Grid) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Product Price ($)</label>
                        <input
                            type="number"
                            name="p_price"
                            value={productData.p_price}
                            onChange={onHandleChange}
                            placeholder="0.00"
                            className={`${inputClasses} ${error.p_price ? 'border-red-500' : ''}`}
                        />
                        {error.p_price && <p className="text-red-500 text-xs mt-1">{error.p_price}</p>}
                    </div>
                    <div>
                        <label className={labelClasses}>Product Stock</label>
                        <input
                            type="number"
                            name="p_stock"
                            value={productData.p_stock}
                            onChange={onHandleChange}
                            placeholder="Quantity available"
                            className={`${inputClasses} ${error.p_stock ? 'border-red-500' : ''}`}
                        />
                        {error.p_stock && <p className="text-red-500 text-xs mt-1">{error.p_stock}</p>}
                    </div>
                </div>

                {/* Row 3: Image Link & Category (Grid) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Product Image URL</label>
                        <input
                            type="text"
                            name="p_image"
                            value={productData.p_image}
                            onChange={onHandleChange}
                            placeholder="https://images.com/product.jpg"
                            className={`${inputClasses} ${error.p_image ? 'border-red-500' : ''}`}
                        />
                        {error.p_image && <p className="text-red-500 text-xs mt-1">{error.p_image}</p>}

                        {productData.p_image && <img src={productData.p_image} width={100} alt="" className="mt-2 rounded-lg border border-slate-200" />}
                    </div>
                    <div>
                        <label className={labelClasses}>Product Category</label>
                        <div className="relative">
                            <select name="p_category" value={productData.p_category} onChange={onHandleChange} className={`${inputClasses} appearance-none cursor-pointer ${error.p_category ? 'border-red-500' : ''}`}>
                                <option value="">Select a category</option>
                                {productCategory.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            {/* Custom Chevron Icon for Select */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {error.p_category && <p className="text-red-500 text-xs mt-1">{error.p_category}</p>}
                    </div>
                </div>

                {/* Row 4: Description */}
                <div>
                    <label className={labelClasses}>Product Description</label>
                    <textarea
                        name="p_description"
                        rows={4}
                        value={productData.p_description}
                        onChange={onHandleChange}
                        placeholder="Describe the product's features and benefits..."
                        className={`${inputClasses} resize-none ${error.p_description ? 'border-red-500' : ''}`}
                    ></textarea>
                    {error.p_description && <p className="text-red-500 text-xs mt-1">{error.p_description}</p>}
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-yellow-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-yellow-200 transition-all hover:bg-yellow-700 active:scale-95"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
}
