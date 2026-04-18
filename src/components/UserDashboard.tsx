import React from 'react'
import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'
import connectToDB from '@/lib/db'
import Grocery from '@/models/grocery.model'
import GroceryItemCard from './GroceryItemCard'

const UserDashboard = async() => {
  await connectToDB();
  const groceries= await Grocery.find({});
  const plainGroceries = JSON.parse(JSON.stringify(groceries));
  return (
    <div>
        <HeroSection />
        <CategorySlider />
        <div className=' w-[90%] md-[80%] mx-auto mt-10 '>
          <h2 className='text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center'>Popular Grocery Items</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
            {plainGroceries.map((grocery: any) => (
              <GroceryItemCard key={grocery._id} item={grocery} />
            ))}
          </div>
        </div>
    </div>
  )
}

export default UserDashboard