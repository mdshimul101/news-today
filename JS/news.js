const loadCategories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        setCategoryName(data.data.news_category);

    }
    catch (error) {
        console.log(error);
    }

}
const setCategoryName = (categorys) => {
    const allCategory = document.getElementById('all-category');
    categorys.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a  onclick="loadNews('${category.category_id}','${category.category_name}')" style="text-decoration: none;cursor:pointer;" class="fw-semibold">${category.category_name}</a>`;
        allCategory.appendChild(div);
    });
}
const loadNews = (category_id, categoryName) => {
    togglespinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, data.data.length, categoryName))

        .catch(error => console.log(error))
    console.log(data);
}
const displayNews = (data, length, categoryName) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const foundNews = document.getElementById('found-news');
    foundNews.innerHTML = '';
    const foundNewsDiv = document.createElement('div');
    foundNewsDiv.innerHTML = `
      <h5 class="ms-2">${length ? length : 'No'} News found for ${categoryName} </h5>
      `;
    foundNews.appendChild(foundNewsDiv);
    const totalView = data.sort((view1, view2) => view2.total_view - view1.total_view);
    for (const news of data) {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
     <div class="card">
     <img src="${news.thumbnail_url}" class="card-img-top p-3" alt="...">
     <div class="card-body">
     <h5 class="card-title text-black fw-semibold">${news.title}</h5>
     <p class="card-text">${news.details.slice(0, 200)}...</div>
     <div class="d-flex align-items-center justify-content-between">
     <img src="${news.author.img}" class="rounded-circle p-3 w-25">
     <div class="text-center">
     <p class="p-0 m-0">${news.author.name ? news.author.name : 'No author name'}</p>
     <span>${news.author.published_date ? news.author.published_date : 'No Publish Date'}</span>
     </div>
     <p class="ms-4"><i class="fa-solid fa-eye ms-2 mt-4 me-1"></i>${news.total_view ? news.total_view : 'No View'}</p>
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

const detailNews = (news) => {

    const url = `https://openapi.programming-hero.com/api/news/${news}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))

}

const displayNewsDetails = (data) => {

    const modelTitle = document.getElementById('newsDetailsLabel');
    modelTitle.innerText = data.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <div class="card p-2">
    <img src="${data.image_url}" alt="" id="modal-image" class="mx-auto d-block w-100">
    <div class="card-body">
    <h4 class="card-title">${data.title ? data.title : 'No title'}</h4>
    <h6 class="card-text fs-5 text-black">Author Name : ${data.author.name ? data.author.name : 'No author'}</h6>
    <p class="text-black d-inline">Release Date : ${data.author.published_date ? data.author.published_date : 'No Publish Date'}</p>
    <p class="d-inline ms-5">Views : ${data.total_view ? data.total_view : 'No View'}</p>
    <p class="text-black">Ratings : ${data.rating.number ? data.rating.number : 'No Ratings'}</p>
    <br>
    <p class="text-black">Details : ${data.details ? data.details : 'No Details'}</p>
    
    </div>
    </div>
  `;
}
togglespinner(true);
loadCategories();
loadNews('08', 'All News');
