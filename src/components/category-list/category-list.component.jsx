import './category-list.styles.scss'
import CategoryItem from '../category-item/category-item.component';

const CategoryList = ({categories}) => {

    return (
        <div className="categories-container">
  
        {categories.map((category) => ( //iteratre over array of categories. title is passing in deconstructed category attribute
            <CategoryItem key={category.id} category = {category} /> //category is prop getting passed to CI component. key needs to be identified at level where mapping happens
        ))}

        </div>
    )
    


}

export default CategoryList