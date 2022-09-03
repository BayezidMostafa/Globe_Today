const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
}

const displayCatagory = categories => {
    const containerCategory = document.getElementById('container-catagory');
    categories.forEach(category => {
        // console.log(category)
        const categoryUl = document.createElement('ul');
        categoryUl.classList.add('navbar-nav');
        categoryUl.innerHTML = `
        <li class="nav-item">
            <a onclick="gettingCategoryDetails(${category.category_id})" class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
        </li>
        `;
        containerCategory.appendChild(categoryUl);
    });
}


const gettingCategoryDetails = categoryId => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
    toggleingSpinner(true)
}

const displayCategoryNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    newses.forEach(news => {
        // console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card">
                <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.slice(0, 500)}...</p>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <img style="width: 50px;" class="img-fluid rounded-circle" src="${news.author.img}">
                        <div class="ms-2">
                            <p class="m-0">${news.author.name}</p>
                            <p class="m-0">${news.author.published_date}</p>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex">
                            <div class="me-2"><i class="fa-solid fa-eye"></i></i></div>
                            <div><p>${news.total_view}</p></div>
                        </div>
                    </div>
                        <div class="d-flex">
                            <div class="me-2">
                                <p>${news.rating.number ? news.rating.number : 'Rating Not Found'}</p>
                            </div>
                            <div>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>
                </div>
                <div class="text-center mt-4">
                    <button onclick="newsDetailsInfo('${news._id}')" class="btn btn-dark w-100"  data-bs-toggle="modal" data-bs-target="#newsDetails">Read More</button>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
        // For News Count
        const lengthOfNews = newsContainer.childNodes.length;
        const newsCounter = document.getElementById('counter');
        if (lengthOfNews !== 0) {
            newsCounter.innerText = lengthOfNews;
        }
        else {
            newsContainer.innerText = 0;
        }
    })
    toggleingSpinner(false)
}



const newsDetailsInfo = info => {
    const url = `https://openapi.programming-hero.com/api/news/${info}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
}

const displayNewsDetails = news => {
    console.log(news)
    const modalBodyInfo = document.getElementById('modal-body-info');
    modalBodyInfo.innerHTML = `
        <img class="img-fluid" src="${news.image_url}">
    `;
}

const toggleingSpinner = isLoading => {
    const loadingScene = document.getElementById('loader-scene');
    if (isLoading) {
        loadingScene.classList.remove('d-none')
    }
    else {
        loadingScene.classList.add('d-none')
    }
}


loadCategory();