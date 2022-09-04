const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    setCategoryName(data.data.news_category);


}
const setCategoryName = (categorys) => {
    //console.log(categorys);

    const allCategory = document.getElementById('all-category');


    categorys.forEach(category => {
        //console.log(category);

        const div = document.createElement('div');

        div.innerHTML = `
        <a  onclick="loadNews('${category.category_id}')" style="text-decoration: none;cursor:pointer;" class="fw-semibold">${category.category_name}</a>`;
        allCategory.appendChild(div);

    });

}

loadCategories();