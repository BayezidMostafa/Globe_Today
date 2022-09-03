const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
        .catch((error) => console.log(error))
}

const displayCatagory = categories => {
    const containerCategory = document.getElementById('container-catagory');
    categories.forEach(category => {
        // console.log(category)
        const categoryUl = document.createElement('ul');
        categoryUl.classList.add('navbar-nav');
        categoryUl.innerHTML = `
        <li class="nav-item me-5">
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
    .then(data => displayCategoryNews(data.data));
    toggleingSpinner(true);
}

const displayCategoryNews = allNewses => {
    allNewses.sort((view1, view2) => view2.total_view - view1.total_view);
    const counter = document.getElementById('counter');
    const newsContainer = document.getElementById('news-container');
    counter.innerText='0';
    newsContainer.innerHTML = ``;
    allNewses.forEach(news => {
        // console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card shadow rounded-4">
                <img src="${news.thumbnail_url}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${news.title ? news.title : 'No title Found'}</h5>
                <p class="card-text">${news.details.slice(0, 500) ? news.details.slice(0, 500) : 'Informations Missing'}...</p>
                <div class="d-flex justify-content-between">
                    <div class="d-md-flex">
                        <img style="width: 50px;" class="img-fluid rounded-circle" src="${news.author.img ? news.author.img : 'No Author Image'}">
                        <div class="ms-2">
                            <p class="m-0 fw-semibold">${news.author.name ? news.author.name : 'Author Name Missing'}</p>
                            <p class="m-0 text-muted">${news.author.published_date ? news.author.published_date : 'No Date Found'}</p>
                        </div>
                    </div>
                    <div>
                        <div class="d-md-flex">
                            <div class="me-2 text-center"><i class="fa-solid fa-eye"></i></i></div>
                            <div><p>${news.total_view ? news.total_view : 'No View'}</p></div>
                        </div>
                    </div>
                        <div class="d-md-flex">
                            <div class="me-2">
                                <p class="m-0 text-center">${news.rating.number ? news.rating.number : 'Rating Not Found'}</p>
                            </div>
                            <div class="text-center">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </div>
                        </div>
                </div>
                <div class="text-center mt-4">
                    <button onclick="newsDetailsInfo('${news._id ? news._id : 'News Id Missing'}')" class="btn btn-dark w-100"  data-bs-toggle="modal" data-bs-target="#newsDetails">Read More</button>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
        // For News Count
        const lengthOfNews = newsContainer.childNodes.length;
        // console.log(lengthOfNews);
        const lengthOfNewsStr = JSON.stringify(lengthOfNews)
        const newsCounter = document.getElementById('counter');
        newsCounter.innerText = lengthOfNews;
    })
    toggleingSpinner(false)
}



const newsDetailsInfo = info => {
    const url = `https://openapi.programming-hero.com/api/news/${info}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch((error) => console.log(error))
}

const displayNewsDetails = news => {
    // console.log(news);
    const modalBodyInfo = document.getElementById('modal-body-info');
    modalBodyInfo.innerHTML = `
    <div>
        <img class="img-fluid container d-block" src="${news.image_url ? news.image_url : 'Image Missing'}">
        <p class="text-center fs-4 fw-semibold pt-3">${news.title ? news.title : 'No Title Found'}</p>
        <p class="px-3 mt-2">${news.details ? news.details : 'Details Info Missing'}</p>
    </div>
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
gettingCategoryDetails(08);