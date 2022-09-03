const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
}

const displayCatagory = categories => {
    const categoriesContainer = document.getElementById('category-container');
    categories.forEach(category => {
        // console.log(category)
        const catDiv = document.createElement('div');
        catDiv.innerHTML = `
        <a onclick="gettingCategoryDetails(${category.category_id})" type="button" class="text-decoration-none text-dark">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(catDiv);
    });
}


const gettingCategoryDetails = categoryId => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
}

const displayCategoryNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    newses.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card')
        newsDiv.classList.add('mb-5')
        newsDiv.innerHTML = `
        <div class="row g-0 d-flex align-items-center p-4">
            <div class="col-md-4">
                <img class="img-fluid" src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 600)}</p>
                    <div class="d-flex justify-content-between align-content-center">
                        <div class="d-flex">
                            <div>
                                <img style="width: 50px;" class="img-fluid rounded-circle" src="${news.author.img}">
                            </div>
                            <div class="ms-3">
                                <p class="m-0">${news.author.name}</p>
                                <p class="m-0">${news.author.published_date}</p>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="me-2"><i class="fa-solid fa-eye"></i></i></div>
                            <div><p class="">${news.total_view}</p></div>
                        </div>
                        <div class="d-flex">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div>
                            <button class="border-0 bg-transparent" type="button"><i
                                    class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}

loadCategory()