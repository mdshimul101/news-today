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

const loadNews = (category_id) => {
    togglespinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, data.data.length))
        .catch(error => console.log(error))

}
const displayNews = (data, length) => {
    //console.log(name);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const foundNews = document.getElementById('found-news');
    foundNews.innerHTML = '';
    const foundNewsDiv = document.createElement('div');
    foundNewsDiv.innerHTML = `
      <h5 class="ms-2">${length ? length : 'No'} News found </h5>
      `;
    foundNews.appendChild(foundNewsDiv);
    for (const news of data) {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
     <div class="card">
     <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
     <div class="card-body">
     <h5 class="card-title">${news.title}</h5>
     <p class="card-text">${news.details.slice(0, 200)}...</div>
     <div class="d-flex align-items-center justify-content-between">
     <img src="${news.author.img}" class="rounded-circle p-3 w-25">
     <div class="text-center">
     <p class="p-0 m-0">${news.author.name ? news.author.name : 'No author name'}</p>
     <span>${news.author.published_date ? news.author.published_date : 'No Publish Date'}</span>
     </div>
     <p class="ms-4"><i class="fa-solid fa-eye me-2"></i>${news.total_view ? news.total_view : 'No View'}</p>
     <button onclick="detailNews('${news._id}')" type="button" class="mx-auto"  data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
    </div>
   `;
        newsContainer.appendChild(newsDiv);
    }
    togglespinner(false);

}

const togglespinner = isLoading => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }

}


loadCategories();