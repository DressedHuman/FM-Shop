import PropTypes from 'prop-types';
import { useState } from 'react';

const FilterSection = ({ categories, sort }) => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    // handler for sorting products
    const handleSort = (category) => {
        setSelectedCategory(category);
        sort(category);
    }

    return (
        <div className='min-h-max space-y-3'>
            <h2 className='text-xl md:text-[22px] text-center font-semibold text-black'>Filter by Categories</h2>
            <div className="flex lg:flex-col flex-wrap lg:flex-nowrap justify-center lg:justify-start items-center gap-2">
                <button
                    onClick={() => handleSort("all")}
                    className={`w-max lg:w-full text-center ${selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-[gray]/35 text-[#717171]"} font-semibold text-xl rounded-lg px-4 py-1 font-inter`}
                >
                    all
                </button>
                {
                    categories.map((category, idx) => <button
                        onClick={() => handleSort(category)}
                        key={idx}
                        className={`w-max lg:w-full text-center ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-[gray]/35 text-[#717171]"} font-semibold text-xl rounded-lg px-4 py-1 lowercase text-nowrap lg:text-wrap`}
                    >
                        {category}
                    </button>)
                }
            </div>
        </div>
    );
};


FilterSection.propTypes = {
    categories: PropTypes.array,
    sort: PropTypes.func,
}

export default FilterSection;