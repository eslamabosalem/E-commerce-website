import React from 'react'
import Brands from '../Brands/Brands'
import Recentproducts from '../Recentproducts/Recentproducts'
import MailSilder from '../MainSilder/MailSilder'
import CategoiesSlider from '../CategoriesSlider/CategoiesSlider'
import Search from '../Seach/Seach'


export default function Home() {


  return (

    <div>
       <div className="container mx-auto">
      <MailSilder></MailSilder>
<CategoiesSlider></CategoiesSlider>
<Recentproducts></Recentproducts>

</div>

    </div>
  )
}
