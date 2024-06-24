import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import CategoryCard from './CategoryCard'

const Categories = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/***CategoryCard */}
      <CategoryCard
        imgUrl="https://images.unsplash.com/photo-1552611052-60b2c00a2be8?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <CategoryCard
        imgUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        
      />
      <CategoryCard
        imgUrl="https://plus.unsplash.com/premium_photo-1686090448301-4c453ee74718?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        
      />
      <CategoryCard
        imgUrl="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        
      />
      <CategoryCard
        imgUrl="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        
      />
       <CategoryCard
        imgUrl="https://plus.unsplash.com/premium_photo-1674004585426-c6ad2adbe4c0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        
      />
     
    </ScrollView>


  )
}

export default Categories